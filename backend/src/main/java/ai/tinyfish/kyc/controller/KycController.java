package ai.tinyfish.kyc.controller;

import ai.tinyfish.kyc.service.TinyFishService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/kyc")
@CrossOrigin(origins = "*") // Allow frontend to connect
public class KycController {

    private final TinyFishService tinyFishService;

    public KycController(TinyFishService tinyFishService) {
        this.tinyFishService = tinyFishService;
    }

    /**
     * Endpoint for the frontend to connect and receive the SSE stream from the TinyFish agent.
     * 
     * @param companyName Name of the target company
     * @return Flux emitting SSE events to the frontend dashboard
     */
    @GetMapping(value = "/investigate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> startInvestigation(@RequestParam("company") String companyName) {
        return tinyFishService.executeKycInvestigation(companyName);
    }
}
