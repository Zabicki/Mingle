package io.web.rest;

import io.MingleApp;
import io.domain.Event;
import io.domain.User;
import io.repository.EventRepository;
import io.repository.UserRepository;
import io.service.EventService;
import io.service.UserService;
import io.web.rest.errors.ExceptionTranslator;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;


import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.domain.enumeration.Category;
import io.domain.enumeration.Privacy;
/**
 * Integration tests for the {@link EventResource} REST controller.
 */
@SpringBootTest(classes = MingleApp.class)
public class EventResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final double[] DEFAULT_LOCATION = {20,50};
    private static final double[] UPDATED_LOCATION = {30,60};

    private static final Integer DEFAULT_MAX_PARTICIPANTS = 1;
    private static final Integer UPDATED_MAX_PARTICIPANTS = 2;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.now().plusDays(78);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now().plusDays(10);

    private static final Boolean DEFAULT_RECURRENT = false;
    private static final Boolean UPDATED_RECURRENT = true;

    private static final Long DEFAULT_INTERVAL = 1L;
    private static final Long UPDATED_INTERVAL = 2L;

    private static final Category DEFAULT_CATEGORY = Category.SPORT;
    private static final Category UPDATED_CATEGORY = Category.FOOD;

    private static final Privacy DEFAULT_PRIVACY = Privacy.PUBLIC;
    private static final Privacy UPDATED_PRIVACY = Privacy.PRIVATE;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private EventRepository eventRepositoryMock;

    @Mock
    private EventService eventServiceMock;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restEventMockMvc;

    private Event event;

    private User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventResource eventResource = new EventResource(eventService);
        this.restEventMockMvc = MockMvcBuilders.standaloneSetup(eventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();

        userRepository.deleteAll();
        user = new User();
        user.setLogin("user");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setEmail("some@mail.com");
        userRepository.save(user);
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createEntity() {
        Event event = new Event()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE)
            .city(DEFAULT_CITY)
            .address(DEFAULT_ADDRESS)
            .location(DEFAULT_LOCATION)
            .maxParticipants(DEFAULT_MAX_PARTICIPANTS)
            .date(DEFAULT_DATE)
            .recurrent(DEFAULT_RECURRENT)
            .interval(DEFAULT_INTERVAL)
            .category(DEFAULT_CATEGORY)
            .privacy(DEFAULT_PRIVACY);
        return event;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createUpdatedEntity() {
        Event event = new Event()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .city(UPDATED_CITY)
            .location(UPDATED_LOCATION)
            .address(UPDATED_ADDRESS)
            .maxParticipants(UPDATED_MAX_PARTICIPANTS)
            .date(UPDATED_DATE)
            .recurrent(UPDATED_RECURRENT)
            .interval(UPDATED_INTERVAL)
            .category(UPDATED_CATEGORY)
            .privacy(UPDATED_PRIVACY);
        return event;
    }

    @BeforeEach
    public void initTest() {
        eventRepository.deleteAll();
        event = createEntity();
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.BEFORE_METHOD)
    @WithMockUser("user")
    public void createEvent() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();

        // Create the Event
        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isCreated());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate + 1);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEvent.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testEvent.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testEvent.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);
        assertThat(testEvent.getCity()).isEqualTo(DEFAULT_CITY.toLowerCase());
        assertThat(testEvent.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testEvent.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testEvent.getMaxParticipants()).isEqualTo(DEFAULT_MAX_PARTICIPANTS);
        assertThat(testEvent.getDate()).isEqualTo(DEFAULT_DATE.truncatedTo(ChronoUnit.MILLIS));
        assertThat(testEvent.isRecurrent()).isEqualTo(DEFAULT_RECURRENT);
        assertThat(testEvent.getInterval()).isEqualTo(DEFAULT_INTERVAL);
        assertThat(testEvent.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testEvent.getPrivacy()).isEqualTo(DEFAULT_PRIVACY);
        assertThat(testEvent.getHost()).isEqualTo(userService.getUserWithAuthorities().get());
    }

    @Test
    @WithMockUser("user")
    public void createEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventRepository.findAll().size();

        // Create the Event with an existing ID
        event.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setName(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setDescription(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setCity(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setAddress(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setDate(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkRecurrentIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setRecurrent(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setCategory(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPrivacyIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventRepository.findAll().size();
        // set the field null
        event.setPrivacy(null);

        // Create the Event, which fails.

        restEventMockMvc.perform(post("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllEvents() throws Exception {
        // Initialize the database
        eventService.save(event);

        // Get all the eventList
        restEventMockMvc.perform(get("/api/events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(event.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toLowerCase())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].location",hasItem(hasItem(DEFAULT_LOCATION[0]))))
            .andExpect(jsonPath("$.[*].location",hasItem(hasItem(DEFAULT_LOCATION[1]))))
            .andExpect(jsonPath("$.[*].maxParticipants").value(hasItem(DEFAULT_MAX_PARTICIPANTS)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.truncatedTo(ChronoUnit.MILLIS).toString().split("\\[")[0])))
            .andExpect(jsonPath("$.[*].recurrent").value(hasItem(DEFAULT_RECURRENT.booleanValue())))
            .andExpect(jsonPath("$.[*].interval").value(hasItem(DEFAULT_INTERVAL.intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].privacy").value(hasItem(DEFAULT_PRIVACY.toString())));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEventsWithEagerRelationshipsIsEnabled() throws Exception {
        EventResource eventResource = new EventResource(eventServiceMock);
        when(eventServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEventMockMvc = MockMvcBuilders.standaloneSetup(eventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEventMockMvc.perform(get("/api/events?eagerload=true"))
        .andExpect(status().isOk());

        verify(eventServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEventsWithEagerRelationshipsIsNotEnabled() throws Exception {
        EventResource eventResource = new EventResource(eventServiceMock);
            when(eventServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEventMockMvc = MockMvcBuilders.standaloneSetup(eventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEventMockMvc.perform(get("/api/events?eagerload=true"))
        .andExpect(status().isOk());

            verify(eventServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", event.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(event.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toLowerCase()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.location",hasItem(DEFAULT_LOCATION[0])))
            .andExpect(jsonPath("$.location",hasItem(DEFAULT_LOCATION[1])))
            .andExpect(jsonPath("$.maxParticipants").value(DEFAULT_MAX_PARTICIPANTS))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.truncatedTo(ChronoUnit.MILLIS).toString().split("\\[")[0]))
            .andExpect(jsonPath("$.recurrent").value(DEFAULT_RECURRENT.booleanValue()))
            .andExpect(jsonPath("$.interval").value(DEFAULT_INTERVAL.intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.privacy").value(DEFAULT_PRIVACY.toString()));
    }

    @Test
    public void getNonExistingEvent() throws Exception {
        // Get the event
        restEventMockMvc.perform(get("/api/events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // Update the event
        Event updatedEvent = eventRepository.findById(event.getId()).get();
        updatedEvent
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE)
            .city(UPDATED_CITY)
            .address(UPDATED_ADDRESS)
            .location(UPDATED_LOCATION)
            .maxParticipants(UPDATED_MAX_PARTICIPANTS)
            .date(UPDATED_DATE)
            .recurrent(UPDATED_RECURRENT)
            .interval(UPDATED_INTERVAL)
            .category(UPDATED_CATEGORY)
            .privacy(UPDATED_PRIVACY);

        restEventMockMvc.perform(put("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvent)))
            .andExpect(status().isOk());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
        Event testEvent = eventList.get(eventList.size() - 1);
        assertThat(testEvent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEvent.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testEvent.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testEvent.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);
        assertThat(testEvent.getCity()).isEqualTo(UPDATED_CITY.toLowerCase());
        assertThat(testEvent.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testEvent.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testEvent.getMaxParticipants()).isEqualTo(UPDATED_MAX_PARTICIPANTS);
        assertThat(testEvent.getDate()).isEqualTo(UPDATED_DATE.truncatedTo(ChronoUnit.MILLIS));
        assertThat(testEvent.isRecurrent()).isEqualTo(UPDATED_RECURRENT);
        assertThat(testEvent.getInterval()).isEqualTo(UPDATED_INTERVAL);
        assertThat(testEvent.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testEvent.getPrivacy()).isEqualTo(UPDATED_PRIVACY);
    }

    @Test
    public void updateNonExistingEvent() throws Exception {
        int databaseSizeBeforeUpdate = eventRepository.findAll().size();

        // Create the Event

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventMockMvc.perform(put("/api/events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(event)))
            .andExpect(status().isBadRequest());

        // Validate the Event in the database
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEvent() throws Exception {
        // Initialize the database
        eventService.save(event);

        int databaseSizeBeforeDelete = eventRepository.findAll().size();

        // Delete the event
        restEventMockMvc.perform(delete("/api/events/{id}", event.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Event> eventList = eventRepository.findAll();
        assertThat(eventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @WithMockUser("user")
    public void testNearbyEvents() throws Exception{
        eventService.save(event);

        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/near/{latitude}/{longitude}/{radius}","60.2","30.2","30"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.[*].name").value(hasSize(1)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(UPDATED_NAME)));

    }

    @Test
    @WithMockUser("user")
    public void testEventsFromCity() throws Exception{
        eventService.save(event);

        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/city/{city}",DEFAULT_CITY))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.[*].name").value(hasSize(1)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));

    }

    @Test
    @WithMockUser("user")
    public void testCorrectAccept() throws Exception{
        eventService.save(event);

        restEventMockMvc.perform(put("/api/events/accept/{id}",event.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    public void testAcceptWithNoOneLoggedIn() throws Exception{
        eventService.save(event);

        restEventMockMvc.perform(put("/api/events/accept/{id}",event.getId()))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser("user")
    public void testAcceptWithFullEvent() throws Exception{
        event.setMaxParticipants(0);
        eventService.save(event);

        restEventMockMvc.perform(put("/api/events/accept/{id}",event.getId()))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser("user")
    public void testAcceptWithIncorrectId() throws Exception{
        eventService.save(event);

        restEventMockMvc.perform(put("/api/events/accept/{id}","123"))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser("user")
    public void testGetUserEvents() throws Exception{
        event.setHost(userService.getUserWithAuthorities().get());
        eventService.save(event);
        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/user/hosted"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.[*].name").value(hasSize(1)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    public void testGetUserEventsRequiresLoggedInUser() throws Exception{
        event.setHost(user);
        eventService.save(event);
        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/user/hosted"))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser("user")
    public void testGetUserAcceptedEvents() throws Exception{
        event.addParticipants(userService.getUserWithAuthorities().get());
        eventService.save(event);
        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/user/accepted"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.[*].name").value(hasSize(1)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    public void testGetUserAcceptedEventsRequiresLoggedInUser() throws Exception{
        event.addParticipants(user);
        eventService.save(event);
        eventService.save(createUpdatedEntity());

        restEventMockMvc.perform(get("/api/events/user/hosted"))
            .andExpect(status().isBadRequest());
    }

}
