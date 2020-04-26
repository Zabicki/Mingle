package io.web.rest;

import io.domain.Event;
import io.service.EventService;
import io.service.errors.UserNotLoggedIn;
import io.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.domain.Event}.
 */
@RestController
@RequestMapping("/api")
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(EventResource.class);

    private static final String ENTITY_NAME = "event";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventService eventService;

    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    /**
     * {@code POST  /events} : Create a new event.
     *
     * @param event the event to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new event, or with status {@code 400 (Bad Request)} if the event has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to save Event : {}", event);
        if (event.getId() != null) {
            throw new BadRequestAlertException("A new event cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Event result = eventService.save(event);
        return ResponseEntity.created(new URI("/api/events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /events} : Updates an existing event.
     *
     * @param event the event to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated event,
     * or with status {@code 400 (Bad Request)} if the event is not valid,
     * or with status {@code 500 (Internal Server Error)} if the event couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/events")
    public ResponseEntity<Event> updateEvent(@Valid @RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to update Event : {}", event);
        if (event.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Event result = eventService.save(event);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, event.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT /events/accept/:id} : accept event.
     *
     * @param id id of the event.
     * @return the {@link ResponseEntity} with status {@code 200 (ok)} and with body of updated event.
     */
    @PutMapping("/events/accept/{id}")
    public ResponseEntity<Event> acceptEvent(@PathVariable String id){
        log.debug("REST request to accept Event with id : {}",id);
        Event result;
        try {
            result = eventService.acceptEvent(id);
        }
        catch (Exception e){
            throw new BadRequestAlertException(e.getMessage(),ENTITY_NAME,"accepterror");
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName,false,ENTITY_NAME,result.getId()))
            .body(result);
    }

    /**
     * {@code GET  /events} : get all the events.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of events in body.
     */
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Events");
        Page<Event> page;
        if (eagerload) {
            page = eventService.findAllWithEagerRelationships(pageable);
        } else {
            page = eventService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /events/near/:latitude/:longitude/:radius} : get all nearby events.
     *
     * @param pageable the pagination information.
     * @param latitude latitude of the user.
     * @param longitude longitude of the user.
     * @param radius maximal distance to event.
     * @return the {@link ResponseEntity} with status {@code 200(ok)} and the list of events in body.
     */
    @GetMapping("/events/near/{latitude}/{longitude}/{radius}")
    public ResponseEntity<List<Event>> getAllNearbyEvents(Pageable pageable, @PathVariable String latitude,
                                                          @PathVariable String longitude, @PathVariable String radius){
        log.debug("REST request to get all nearby events");
        Point point;
        double distance;
        try {
            point = new Point(Double.parseDouble(latitude), Double.parseDouble(longitude));
            distance = Double.parseDouble(radius) * 1000;
        }catch (NumberFormatException e){
            throw new BadRequestAlertException("Parameters are not numbers ", latitude + ", " + longitude + "," + radius,"invalidParameters");
        }
        Page<Event> foundEvents;
        try {
            foundEvents = eventService.findAllByLocationNear(pageable, point, distance);
        }catch (UserNotLoggedIn e){
            throw new BadRequestAlertException(e.getMessage(),ENTITY_NAME,"nooneloggedin");
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),foundEvents);
        return ResponseEntity.ok().headers(headers).body(foundEvents.getContent());
    }

    /**
     * {@code GET /events/city/:city} : get all events from city.
     *
     * @param pageable the pagination information.
     * @param city given city.
     * @return the {@link ResponseEntity} with status {@code 200(ok)} and the list of events in body.
     */
    @GetMapping("/events/city/{city}")
    public ResponseEntity<List<Event>> getAllEventsFromCity(Pageable pageable, @PathVariable String city){
        log.debug("REST request to get all events from city : {}",city);
        Page<Event> foundEvents;
        try {
            foundEvents = eventService.findAllFromCity(pageable, city);
        }catch (UserNotLoggedIn e){
            throw new BadRequestAlertException(e.getMessage(),ENTITY_NAME,"nooneloggedin");
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),foundEvents);
        return ResponseEntity.ok().headers(headers).body(foundEvents.getContent());
    }

    /**
     * {@code GET  /events/:id} : get the "id" event.
     *
     * @param id the id of the event to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the event, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable String id) {
        log.debug("REST request to get Event : {}", id);
        Optional<Event> event = eventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(event);
    }

    /**
     * {@code DELETE  /events/:id} : delete the "id" event.
     *
     * @param id the id of the event to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        log.debug("REST request to delete Event : {}", id);
        eventService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
