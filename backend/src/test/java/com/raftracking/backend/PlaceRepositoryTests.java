package com.raftracking.backend;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ExtendWith(SpringExtension.class)
public class PlaceRepositoryTests {

    @Autowired private PlaceRepository placeRepository;

    private Place place1, place2;

    @BeforeEach
    public void setUp() {
        place1 = new Place();
        place1.setUserId("user1");
        place1 = placeRepository.save(place1);

        place2 = new Place();
        place2.setUserId("user2");
        place2 = placeRepository.save(place2);
    }

    @Test
    public void testFindByUserId() {
        List<Place> foundPlacesUser1 = placeRepository.findByUserId("user1");
        assertThat(foundPlacesUser1).hasSize(1).contains(place1);

        List<Place> foundPlacesUser2 = placeRepository.findByUserId("user2");
        assertThat(foundPlacesUser2).hasSize(1).contains(place2);

        List<Place> foundPlacesUser3 = placeRepository.findByUserId("user3");
        assertThat(foundPlacesUser3).isEmpty();
    }
}
