package com.raftracking.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Optional;

@WebMvcTest(PlaceController.class)
public class PlaceControllerTests {

    @Autowired private MockMvc mockMvc;

    @MockBean private PlaceRepository placeRepository;

    @MockBean private Authentication authentication;

    private Place examplePlace;

    @BeforeEach
    public void setup() {
        examplePlace = new Place();
        examplePlace.setId(1L);
        examplePlace.setUserId("user123");
        examplePlace.setName("Test Place");

        Mockito.when(authentication.getName()).thenReturn("user123");
    }

    @Test
    public void testGetPlaces() throws Exception {
        Mockito.when(placeRepository.findByUserId("user123"))
                .thenReturn(Arrays.asList(examplePlace));

        mockMvc.perform(MockMvcRequestBuilders.get("/places").principal(authentication))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Test Place"));
    }

    @Test
    public void testAddPlace() throws Exception {
        Mockito.when(placeRepository.save(Mockito.any(Place.class))).thenReturn(examplePlace);

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/places")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"name\":\"New Place\"}")
                                .principal(authentication))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Test Place"));
    }

    @Test
    public void testDeletePlace() throws Exception {
        Mockito.when(placeRepository.findById(1L)).thenReturn(Optional.of(examplePlace));

        mockMvc.perform(MockMvcRequestBuilders.delete("/places/1").principal(authentication))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(placeRepository, Mockito.times(1)).delete(examplePlace);
    }

    @Test
    public void testDeletePlaceForbidden() throws Exception {
        Place otherUserPlace = new Place();
        otherUserPlace.setId(2L);
        otherUserPlace.setUserId("user456");
        Mockito.when(placeRepository.findById(2L)).thenReturn(Optional.of(otherUserPlace));

        mockMvc.perform(MockMvcRequestBuilders.delete("/places/2").principal(authentication))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }
}
