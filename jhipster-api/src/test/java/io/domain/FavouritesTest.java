package io.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.web.rest.TestUtil;

public class FavouritesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Favourites.class);
        Favourites favourites1 = new Favourites();
        favourites1.setId("id1");
        Favourites favourites2 = new Favourites();
        favourites2.setId(favourites1.getId());
        assertThat(favourites1).isEqualTo(favourites2);
        favourites2.setId("id2");
        assertThat(favourites1).isNotEqualTo(favourites2);
        favourites1.setId(null);
        assertThat(favourites1).isNotEqualTo(favourites2);
    }
}
