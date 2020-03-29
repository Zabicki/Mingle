package io.service;

import io.domain.Review;
import io.repository.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Review}.
 */
@Service
public class ReviewService {

    private final Logger log = LoggerFactory.getLogger(ReviewService.class);

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    /**
     * Save a review.
     *
     * @param review the entity to save.
     * @return the persisted entity.
     */
    public Review save(Review review) {
        log.debug("Request to save Review : {}", review);
        return reviewRepository.save(review);
    }

    /**
     * Get all the reviews.
     *
     * @return the list of entities.
     */
    public List<Review> findAll() {
        log.debug("Request to get all Reviews");
        return reviewRepository.findAll();
    }


    /**
     * Get one review by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Review> findOne(String id) {
        log.debug("Request to get Review : {}", id);
        return reviewRepository.findById(id);
    }

    /**
     * Delete the review by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Review : {}", id);
        reviewRepository.deleteById(id);
    }
}
