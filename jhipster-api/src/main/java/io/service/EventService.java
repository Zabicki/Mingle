package io.service;

import io.domain.Event;
import io.domain.User;
import io.domain.enumeration.Category;
import io.repository.EventRepository;
import io.service.errors.EventIsFull;
import io.service.errors.InvalidId;
import io.service.errors.UserNotLoggedIn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Event}.
 */
@Service
public class EventService {

    private final Logger log = LoggerFactory.getLogger(EventService.class);

    private final EventRepository eventRepository;

    private final UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    /**
     * Save a event.
     *
     * @param event the entity to save.
     * @return the persisted entity.
     */
    public Event save(Event event) {
        log.debug("Request to save Event : {}", event);
        return eventRepository.save(event);
    }

    /**
     * Get all the events.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Event> findAll(Pageable pageable) {
        log.debug("Request to get all Events");
        return eventRepository.findAll(pageable);
    }

    /**
     *  Get all nearby events.
     *
     * @param pageable the pagination information.
     * @param point location of the user.
     * @param distance maximal distance to event.
     * @return the list of Events.
     */
    public Page<Event> findAllByLocationNear(Pageable pageable,Point point, double distance){
        log.debug("Request to get all nearby Events");
        User logged = userService.getUserWithAuthorities().orElseThrow(
            UserNotLoggedIn::new
        );
        String regex = createRegexFavourites(logged);
        return eventRepository.findByLocationNear(point, distance,regex,logged.getId(),pageable);
    }

    /**
     * Get all events from given city.
     *
     * @param pageable the pagination information.
     * @param city given city.
     * @return the list of Events.
     */
    public Page<Event> findAllFromCity(Pageable pageable, String city){
        log.debug("Request to get all Events from city : {}",city);
        User logged = userService.getUserWithAuthorities().orElseThrow(
            UserNotLoggedIn::new
        );
        String regex = createRegexFavourites(logged);
        return eventRepository.findByCity(city,regex,logged.getId(),pageable);
    }

    /**
     * Get all the events with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Event> findAllWithEagerRelationships(Pageable pageable) {
        return eventRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * creates regex pattern for favourite categories.
     *
     * @param user given user.
     * @return return string like 'CATEGORY|CATEGORY|...|CATEGORY'.
     */
    public String createRegexFavourites(@NotNull User user){
        Set<Category> favourites = user.getFavourites();
        if (favourites.isEmpty()){
            return ".*";
        }
        return favourites.stream().map(Enum::toString).collect(Collectors.joining("|"));
    }

    /**
     * handles joining events.
     *
     * @param id id of event user wants to join.
     * @return returns updated event.
     */
    public Event acceptEvent(String id){
        Event event = findOne(id).orElseThrow(
            InvalidId::new
        );
        User logged = userService.getUserWithAuthorities().orElseThrow(
            UserNotLoggedIn::new
        );
        if( event.getMaxParticipants() == null ||
        event.getParticipants().size() < event.getMaxParticipants()){
            event.addParticipants(logged);
            eventRepository.save(event);
        }
        else {
            throw new EventIsFull();
        }
        return event;
    }


    /**
     * Get one event by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Event> findOne(String id) {
        log.debug("Request to get Event : {}", id);
        return eventRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the event by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Event : {}", id);
        eventRepository.deleteById(id);
    }
}
