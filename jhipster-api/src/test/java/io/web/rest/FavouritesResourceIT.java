package io.web.rest;

import io.MingleApp;
import io.domain.Favourites;
import io.repository.FavouritesRepository;
import io.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.domain.enumeration.Category;
/**
 * Integration tests for the {@link FavouritesResource} REST controller.
 */
@SpringBootTest(classes = MingleApp.class)
public class FavouritesResourceIT {

    private static final Category DEFAULT_FAVOURITE = Category.SPORT;
    private static final Category UPDATED_FAVOURITE = Category.FOOD;

    @Autowired
    private FavouritesRepository favouritesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restFavouritesMockMvc;

    private Favourites favourites;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FavouritesResource favouritesResource = new FavouritesResource(favouritesRepository);
        this.restFavouritesMockMvc = MockMvcBuilders.standaloneSetup(favouritesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Favourites createEntity() {
        Favourites favourites = new Favourites()
            .favourite(DEFAULT_FAVOURITE);
        return favourites;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Favourites createUpdatedEntity() {
        Favourites favourites = new Favourites()
            .favourite(UPDATED_FAVOURITE);
        return favourites;
    }

    @BeforeEach
    public void initTest() {
        favouritesRepository.deleteAll();
        favourites = createEntity();
    }

    @Test
    public void createFavourites() throws Exception {
        int databaseSizeBeforeCreate = favouritesRepository.findAll().size();

        // Create the Favourites
        restFavouritesMockMvc.perform(post("/api/favourites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favourites)))
            .andExpect(status().isCreated());

        // Validate the Favourites in the database
        List<Favourites> favouritesList = favouritesRepository.findAll();
        assertThat(favouritesList).hasSize(databaseSizeBeforeCreate + 1);
        Favourites testFavourites = favouritesList.get(favouritesList.size() - 1);
        assertThat(testFavourites.getFavourite()).isEqualTo(DEFAULT_FAVOURITE);
    }

    @Test
    public void createFavouritesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = favouritesRepository.findAll().size();

        // Create the Favourites with an existing ID
        favourites.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restFavouritesMockMvc.perform(post("/api/favourites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favourites)))
            .andExpect(status().isBadRequest());

        // Validate the Favourites in the database
        List<Favourites> favouritesList = favouritesRepository.findAll();
        assertThat(favouritesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllFavourites() throws Exception {
        // Initialize the database
        favouritesRepository.save(favourites);

        // Get all the favouritesList
        restFavouritesMockMvc.perform(get("/api/favourites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favourites.getId())))
            .andExpect(jsonPath("$.[*].favourite").value(hasItem(DEFAULT_FAVOURITE.toString())));
    }
    
    @Test
    public void getFavourites() throws Exception {
        // Initialize the database
        favouritesRepository.save(favourites);

        // Get the favourites
        restFavouritesMockMvc.perform(get("/api/favourites/{id}", favourites.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(favourites.getId()))
            .andExpect(jsonPath("$.favourite").value(DEFAULT_FAVOURITE.toString()));
    }

    @Test
    public void getNonExistingFavourites() throws Exception {
        // Get the favourites
        restFavouritesMockMvc.perform(get("/api/favourites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateFavourites() throws Exception {
        // Initialize the database
        favouritesRepository.save(favourites);

        int databaseSizeBeforeUpdate = favouritesRepository.findAll().size();

        // Update the favourites
        Favourites updatedFavourites = favouritesRepository.findById(favourites.getId()).get();
        updatedFavourites
            .favourite(UPDATED_FAVOURITE);

        restFavouritesMockMvc.perform(put("/api/favourites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFavourites)))
            .andExpect(status().isOk());

        // Validate the Favourites in the database
        List<Favourites> favouritesList = favouritesRepository.findAll();
        assertThat(favouritesList).hasSize(databaseSizeBeforeUpdate);
        Favourites testFavourites = favouritesList.get(favouritesList.size() - 1);
        assertThat(testFavourites.getFavourite()).isEqualTo(UPDATED_FAVOURITE);
    }

    @Test
    public void updateNonExistingFavourites() throws Exception {
        int databaseSizeBeforeUpdate = favouritesRepository.findAll().size();

        // Create the Favourites

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFavouritesMockMvc.perform(put("/api/favourites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favourites)))
            .andExpect(status().isBadRequest());

        // Validate the Favourites in the database
        List<Favourites> favouritesList = favouritesRepository.findAll();
        assertThat(favouritesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteFavourites() throws Exception {
        // Initialize the database
        favouritesRepository.save(favourites);

        int databaseSizeBeforeDelete = favouritesRepository.findAll().size();

        // Delete the favourites
        restFavouritesMockMvc.perform(delete("/api/favourites/{id}", favourites.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Favourites> favouritesList = favouritesRepository.findAll();
        assertThat(favouritesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
