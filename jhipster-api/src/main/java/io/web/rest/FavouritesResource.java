package io.web.rest;

import io.domain.Favourites;
import io.repository.FavouritesRepository;
import io.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.domain.Favourites}.
 */
@RestController
@RequestMapping("/api")
public class FavouritesResource {

    private final Logger log = LoggerFactory.getLogger(FavouritesResource.class);

    private static final String ENTITY_NAME = "favourites";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FavouritesRepository favouritesRepository;

    public FavouritesResource(FavouritesRepository favouritesRepository) {
        this.favouritesRepository = favouritesRepository;
    }

    /**
     * {@code POST  /favourites} : Create a new favourites.
     *
     * @param favourites the favourites to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new favourites, or with status {@code 400 (Bad Request)} if the favourites has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/favourites")
    public ResponseEntity<Favourites> createFavourites(@RequestBody Favourites favourites) throws URISyntaxException {
        log.debug("REST request to save Favourites : {}", favourites);
        if (favourites.getId() != null) {
            throw new BadRequestAlertException("A new favourites cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Favourites result = favouritesRepository.save(favourites);
        return ResponseEntity.created(new URI("/api/favourites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /favourites} : Updates an existing favourites.
     *
     * @param favourites the favourites to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated favourites,
     * or with status {@code 400 (Bad Request)} if the favourites is not valid,
     * or with status {@code 500 (Internal Server Error)} if the favourites couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/favourites")
    public ResponseEntity<Favourites> updateFavourites(@RequestBody Favourites favourites) throws URISyntaxException {
        log.debug("REST request to update Favourites : {}", favourites);
        if (favourites.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Favourites result = favouritesRepository.save(favourites);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, favourites.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /favourites} : get all the favourites.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of favourites in body.
     */
    @GetMapping("/favourites")
    public List<Favourites> getAllFavourites() {
        log.debug("REST request to get all Favourites");
        return favouritesRepository.findAll();
    }

    /**
     * {@code GET  /favourites/:id} : get the "id" favourites.
     *
     * @param id the id of the favourites to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the favourites, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/favourites/{id}")
    public ResponseEntity<Favourites> getFavourites(@PathVariable String id) {
        log.debug("REST request to get Favourites : {}", id);
        Optional<Favourites> favourites = favouritesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(favourites);
    }

    /**
     * {@code DELETE  /favourites/:id} : delete the "id" favourites.
     *
     * @param id the id of the favourites to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/favourites/{id}")
    public ResponseEntity<Void> deleteFavourites(@PathVariable String id) {
        log.debug("REST request to delete Favourites : {}", id);
        favouritesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
