package io.service;

import io.MingleApp;
import io.domain.Event;
import io.domain.User;
import io.domain.enumeration.Category;
import io.domain.enumeration.Privacy;
import io.repository.EventRepository;
import io.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Point;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for {@link EventService }
 */
@SpringBootTest(classes = MingleApp.class)
class EventServiceTest {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    private final double[] cracowLocation = {50.0614300,19.9365800};
    private final double[] otherCracowLocation = {50.2,20.2};
    private final double[] warsawLocation = {52.2297700,21.0117800};
    private final double[] otherWarsawLocation = {52.1,20.98};
    private final Pageable pageable = Pageable.unpaged();

    private final Point userLocation = new Point(50, 20);
    private final Point userLocation2 = new Point(52,20.7);

    private User user,user2;

    private Event event,event2,event3,event4,event5;


    public Event createEvent(String name, String description, String city, String address, double[] location,
                             LocalDate date, Boolean recurrent, Category category, Privacy privacy){
        return new Event().name(name).description(description).city(city).address(address).location(location)
            .date(date).recurrent(recurrent).category(category).privacy(privacy);
    }

    @BeforeEach
    public void init(){
        eventRepository.deleteAll();
        event = createEvent("running","just run","Cracow","some address", cracowLocation,
        LocalDate.of(2020,5,26),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event);
        event2 = createEvent("skiing","let's go skiing","Cracow","some other address", otherCracowLocation,
            LocalDate.of(2021,2,12),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event2);
        event3 = createEvent("basketball","some interesting description","Warsaw","some other other address", warsawLocation,
            LocalDate.of(2020,7,2),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event3);
        event4 = createEvent("football","fascinating description","Warsaw","unique address", otherWarsawLocation,
            LocalDate.of(2020,8,22),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event4);
        event5 = createEvent("eating","fascinating description","Cracow","other unique address",
            cracowLocation, LocalDate.of(2020,7,2),false,Category.FOOD,Privacy.PUBLIC);
        eventRepository.save(event5);

        userRepository.deleteAll();
        user = new User();
        user.setLogin("user");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setFavourites(new HashSet<>());
        user.setEmail("some@mail.com");
        userRepository.save(user);

        user2 = new User();
        user2.setLogin("user23");
        user2.setPassword(RandomStringUtils.random(60));
        user2.setActivated(true);
        user2.setFavourites(new HashSet<>());
        user2.setEmail("some2@mail.com");
        userRepository.save(user2);
    }

    @Test
    @WithMockUser("user")
    public void assertThatFindByLocationNearWorks(){
        Set<Category> favourites = new HashSet<>();
        userService.setUserFavourites(favourites);

        Page<Event> foundEvents = eventService.findAllByLocationNear(pageable,userLocation,50 * 1000);
        assertThat(foundEvents.getTotalElements()).isEqualTo(3);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("eating");
        assertThat(foundEvents.getContent().get(2).getName()).isEqualTo("skiing");

        Page<Event> foundEvents2 = eventService.findAllByLocationNear(pageable,userLocation2,50 * 1000);
        assertThat(foundEvents2.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents2.getContent().get(0).getName()).isEqualTo("football");
        assertThat(foundEvents2.getContent().get(1).getName()).isEqualTo("basketball");

    }

    @Test
    @WithMockUser("user")
    public void assertThatFindEventsFromCityWorks(){
        Set<Category> favourites = new HashSet<>();
        userService.setUserFavourites(favourites);

        Page<Event> foundEvents = eventService.findAllFromCity(pageable,"Warsaw");
        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("basketball");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("football");
    }

    @Test
    @WithMockUser("user")
    public void assertThatOnlySportEventsAreFound() {
        Set<Category> favourites = new HashSet<>();
        favourites.add(Category.SPORT);
        userService.setUserFavourites(favourites);

        Page<Event> foundEvents = eventService.findAllByLocationNear(pageable, userLocation, 50 * 1000);

        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("skiing");

        Page<Event> foundEvents2 = eventService.findAllFromCity(pageable, "Warsaw");
        assertThat(foundEvents2.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents2.getContent().get(0).getName()).isEqualTo("basketball");
        assertThat(foundEvents2.getContent().get(1).getName()).isEqualTo("football");

    }
    @Test
    @WithMockUser("user")
    public void assertThatOnlyFoodEventsAreFound() {
        Set<Category> favourites = new HashSet<>();
        favourites.add(Category.FOOD);
        userService.setUserFavourites(favourites);

        Page<Event> foundEvents3 = eventService.findAllByLocationNear(pageable, userLocation2, 50 * 1000);
        assertThat(foundEvents3.getTotalElements()).isEqualTo(0);

        Page<Event> foundEvents4 = eventService.findAllFromCity(pageable, "Cracow");
        assertThat(foundEvents4.getTotalElements()).isEqualTo(1);
        assertThat(foundEvents4.getContent().get(0).getName()).isEqualTo("eating");
    }

    @Test
    @WithMockUser("user")
    public void assertThatBothFoodAndSportEventsAreFound(){
        Set<Category> favourites = new HashSet<>();
        favourites.add(Category.SPORT);
        favourites.add(Category.FOOD);
        userService.setUserFavourites(favourites);

        Page<Event> foundEvents5 = eventService.findAllByLocationNear(pageable,userLocation,50 * 1000);
        assertThat(foundEvents5.getTotalElements()).isEqualTo(3);
        assertThat(foundEvents5.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents5.getContent().get(1).getName()).isEqualTo("eating");
        assertThat(foundEvents5.getContent().get(2).getName()).isEqualTo("skiing");

        Page<Event> foundEvents6 = eventService.findAllFromCity(pageable, "Cracow");
        assertThat(foundEvents6.getTotalElements()).isEqualTo(3);
        assertThat(foundEvents6.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents6.getContent().get(1).getName()).isEqualTo("skiing");
        assertThat(foundEvents6.getContent().get(2).getName()).isEqualTo("eating");
    }

    @Test
    @WithMockUser("user")
    public void assertThatUserEventsAreIgnored(){
        event.setHost(userService.getUserWithAuthorities().get());
        eventRepository.save(event);

        event2.setHost(user2);
        eventRepository.save(event2);

        Page<Event> foundEvents = eventService.findAllByLocationNear(pageable,userLocation,50 * 1000);
        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("eating");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("skiing");

        Page<Event> foundEvents2 = eventService.findAllFromCity(pageable,"Cracow");
        assertThat(foundEvents2.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents2.getContent().get(0).getName()).isEqualTo("skiing");
        assertThat(foundEvents2.getContent().get(1).getName()).isEqualTo("eating");
    }

    @Test
    @WithMockUser("user")
    public void assertThatAlreadyAcceptedEventsAreIgnored(){
        event5.addParticipants(userService.getUserWithAuthorities().get());
        event5.addParticipants(user2);
        eventRepository.save(event5);


        event2.addParticipants(user2);
        eventRepository.save(event2);

        Page<Event> foundEvents = eventService.findAllByLocationNear(pageable,userLocation,50 * 1000);
        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("skiing");

        Page<Event> foundEvents2 = eventService.findAllFromCity(pageable,"Cracow");
        assertThat(foundEvents2.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents2.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents2.getContent().get(1).getName()).isEqualTo("skiing");


    }
}
