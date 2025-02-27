package com.raftracking.backend;


import lombok.*;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/places")
public class PlaceController {

    private final PlaceRepository placeRepository;

    /**
     * GET /places Access: User must be authenticated Description: Retrieves a list of places
     * associated with the authenticated user.
     */
    @GetMapping
    public List<Place> getPlaces(Authentication authentication) {
        String userId = authentication.getName();
        return placeRepository.findByUserId(userId);
    }

    /**
     * POST /places Access: User must be authenticated Description: Adds a new place for the
     * authenticated user. Request Body: Place object
     */
    @PostMapping
    public Place addPlace(@RequestBody Place place, Authentication authentication) {
        place.setUserId(authentication.getName());
        return placeRepository.save(place);
    }

    /**
     * PUT /places/{id} Access: User must be authenticated Description: Updates an existing place
     * with the specified id if it belongs to the authenticated user. Request Body: Place object
     */
    @PutMapping("/{id}")
    public Place updatePlace(
            @PathVariable Long id, @RequestBody Place updatedPlace, Authentication authentication) {
        Place place = placeRepository.findById(id).orElseThrow();
        if (!place.getUserId().equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        updatedPlace.setId(id);
        updatedPlace.setUserId(place.getUserId());
        return placeRepository.save(updatedPlace);
    }

    /**
     * DELETE /places/{id} Access: User must be authenticated Description: Deletes a place with the
     * specified id if it belongs to the authenticated user. Path Variable: id (Long)
     */
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id, Authentication authentication) {
        Place place = placeRepository.findById(id).orElseThrow();
        if (!place.getUserId().equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        placeRepository.delete(place);
    }
}
