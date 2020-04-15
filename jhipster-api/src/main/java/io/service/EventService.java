package io.service;

import io.domain.Event;
import io.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Event}.
 */
@Service
public class EventService {

    private final Logger log = LoggerFactory.getLogger(EventService.class);

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
     * @param point location of the user.
     * @param distance maximal distance to event.
     * @return the list of Events.
     */
    public Page<Event> findAllByLocationNear(Pageable pageable,Point point, Distance distance){
        log.debug("Request to get all nearby Events");
        return eventRepository.findByLocationNear(pageable, point, distance);
    }

    /**
     * Get all events from given city.
     *
     * @param city given city.
     * @return the list of Events.
     */
    public Page<Event> findAllFromCity(Pageable pageable, String city){
        log.debug("Request to get all Events from city : {}",city);
        return eventRepository.findByCity(pageable,city);
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
