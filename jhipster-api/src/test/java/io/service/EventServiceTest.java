package io.service;

import io.MingleApp;
import io.domain.Event;
import io.domain.enumeration.Category;
import io.domain.enumeration.Privacy;
import io.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for {@link EventService }
 */
@SpringBootTest(classes = MingleApp.class)
class EventServiceTest {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    private final double[] cracowLocation = {50.0614300,19.9365800};
    private final double[] otherCracowLocation = {50.2,20.2};
    private final double[] warsawLocation = {52.2297700,21.0117800};
    private final double[] otherWarsawLocation = {52.1,20.98};
    private final Pageable pageable = Pageable.unpaged();


    public Event createEvent(String name, String description, String city, String address, double[] location,
                             LocalDate date, Boolean recurrent, Category category, Privacy privacy){
        return new Event().name(name).description(description).city(city).address(address).location(location)
            .date(date).recurrent(recurrent).category(category).privacy(privacy);
    }

    @BeforeEach
    public void init(){
        eventRepository.deleteAll();
        Event event = createEvent("running","just run","Cracow","some address", cracowLocation,
        LocalDate.of(2020,5,26),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event);
        Event event2 = createEvent("skiing","let's go skiing","Cracow","some other address", otherCracowLocation,
            LocalDate.of(2021,2,12),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event2);
        Event event3 = createEvent("basketball","some interesting description","Warsaw","some other other address", warsawLocation,
            LocalDate.of(2020,7,2),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event3);
        Event event4 = createEvent("football","fascinating description","Warsaw","unique address", otherWarsawLocation,
            LocalDate.of(2020,8,22),false,Category.SPORT,Privacy.PUBLIC);
        eventRepository.save(event4);
    }

    @Test
    public void assertThatFindByLocationNearWorks(){
        Point userLocation = new Point(50,20);
        Distance distance = new Distance(50, Metrics.KILOMETERS);
        Page<Event> foundEvents = eventService.findAllByLocationNear(pageable,userLocation,distance);
        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("running");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("skiing");

        Point userLocation2 = new Point(52,20.7);
        Page<Event> foundEvents2 = eventService.findAllByLocationNear(pageable,userLocation2,distance);
        assertThat(foundEvents2.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents2.getContent().get(0).getName()).isEqualTo("football");
        assertThat(foundEvents2.getContent().get(1).getName()).isEqualTo("basketball");

    }

    @Test
    public void assertThatFindEventsFromCityWorks(){
        Page<Event> foundEvents = eventService.findAllFromCity(pageable,"Warsaw");
        assertThat(foundEvents.getTotalElements()).isEqualTo(2);
        assertThat(foundEvents.getContent().get(0).getName()).isEqualTo("basketball");
        assertThat(foundEvents.getContent().get(1).getName()).isEqualTo("football");
    }

}
