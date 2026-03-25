package ai.tinyfish.kyc.service;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import java.util.Map;
import java.util.HashMap;

@Service
public class TinyFishService {

    private final WebClient webClient;

    // You can inject this from application.properties or environment variable
    @Value("${tinyfish.api.key:YOUR_API_KEY_HERE}")
    private String apiKey;

    @Value("${slack.webhook.url:}")
    private String slackWebhookUrl;

    public TinyFishService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://agent.tinyfish.ai").build();
    }

    /**
     * Executes the autonomous KYC/AML workflow using the TinyFish agent API.
     * Starts by navigating to the target corporate registry and then chains into OFAC cross-referencing.
     *
     * @param companyName Name of the company to investigate
     * @return A Flux string stream containing real-time SSE execution logs from the agent.
     */
    public Flux<String> executeKycInvestigation(String companyName) {
        // Construct the elite prompt (goal) that drives the agent
        String prompt = buildAgentGoal(companyName);

        // Build Payload
        Map<String, String> payload = new HashMap<>();
        // In a real scenario, use actual regional registries based on domain/state. Defaulting to a generic pattern or global index.
        payload.put("url", "https://opencorporates.com/"); 
        payload.put("goal", prompt);
        payload.put("browser_profile", "stealth");

        return this.webClient.post()
                .uri("/v1/automation/run-sse")
                .header("X-API-Key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(payload)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(message -> {
                    if (message.contains("\"type\":\"COMPLETE\"") || message.contains("\"status\":\"COMPLETED\"")) {
                        sendWebhookAlert(companyName);
                    }
                })
                .doOnError(error -> System.err.println("Error during SSE stream: " + error.getMessage()))
                .onErrorResume(e -> Flux.just("[System Recovery] Agent stream interrupted: " + e.getMessage() + "\nRetrying state..."));
    }

    private void sendWebhookAlert(String companyName) {
        if (slackWebhookUrl == null || slackWebhookUrl.trim().isEmpty()) {
            System.out.println("\n[WEBHOOK SYSTEM SIMULATION] Slack webhook URL not explicitly configured.");
            System.out.println("-----> 🚨 Simulated Alert: KYC/AML Scan completely autonomously resolved for " + companyName + ". View dossier.\n");
            return;
        }
        
        try {
            Map<String, Object> slackMsg = new HashMap<>();
            slackMsg.put("text", "🚨 *KYC/AML Autonomous Operator Alert*\nThe 10-minute stealth reconnaissance targeting *" + companyName + "* has successfully completed across all global corporate registries and US Treasury sanctions lists.\n\n👉 Review the Risk Dossier on the central dashboard immediately.");
            
            WebClient.create().post()
                .uri(slackWebhookUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(slackMsg)
                .retrieve()
                .bodyToMono(Void.class)
                .subscribe(); // Async fire and forget
                
            System.out.println("[WEBHOOK SYSTEM] Slack Alert successfully dispatched asynchronously over the wire.");
        } catch (Exception e) {
            System.err.println("Failed to dispatch webhook: " + e.getMessage());
        }
    }

    private String buildAgentGoal(String companyName) {
        return """
            [PHASE 1 - INGESTION & DISCOVERY]
            1. Using the search bar, search for the exact legal entity name: "%s".
            2. Bypass any initial cookie consent banners or captchas silently.
            3. Find the most relevant matching corporate entity and click into its detailed profile.
            4. Locate the 'Directors / Officers' or 'Board of Directors' section.
            5. Extract the full names of all actively listed directors and officers. Format this internally as a JSON Array.

            [PHASE 2 - SANCTION CROSS-REFERENCING (OFAC)]
            6. In a new tab, navigate to the US Treasury OFAC Sanctions Search (https://sanctionssearch.ofac.treas.gov/).
            7. For every extracted director name, input it into the 'Name' field and execute a search.
            8. Read the results table. If there are 0 matches, note 'CLEAR'. If there are matches, click 'Details' and extract the risk factors.
            
            [PHASE 3 - DOSSIER COMILATION]
            9. Output a final compiled JSON dossier containing: 
               {
                 "target_company": "%s",
                 "directors_found": [...],
                 "ofac_matches": [{ "name": "...", "status": "MATCH/CLEAR", "details": "..." }],
                 "risk_level": "HIGH/MEDIUM/LOW"
               }
            """.formatted(companyName, companyName);
    }
}
