import { useState } from 'react';
import css from './NanniesCard.module.css';
import AppointmentModal from '../Modal/AppointmentModal.jsx';

const NanniesCard = ({ nannie }) => {
  const [expended, setExpended] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateAge = birthday => {
    const birthDay = new Date(birthday);
    const today = new Date();

    const age = today.getFullYear() - birthDay.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > birthDay.getMonth() ||
      (today.getMonth() === birthDay.getMonth() &&
        today.getDate() >= birthDay.getDate());

    return hasBirthdayPassed ? age : age - 1;
  };

  const handleToggleExpend = () => {
    setExpended(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setExpended(false);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.containerCard}>
        <div className={css.imgBlock}>
          <img
            src={nannie.avatar_url}
            alt={nannie.name}
            className={css.avatar}
          />
          <span>
            <img
              src="../../../public/icons/GteenElipse.svg"
              alt="Elipse"
              className={css.elipse}
            />
          </span>
        </div>
        <div className={css.cardInfo}>
          <div className={css.nannieInfoHeader}>
            <div className={css.nannieNameBlock}>
              <p className={css.cardTextNannies}>Nanny</p>
              <h2 className={css.cardNanniesName}>{nannie.name}</h2>
            </div>
            <ul className={css.nannieCategoryBlock}>
              <div className={css.categoryInfo}>
                <div className={css.location}>
                  <span>
                    <img
                      src="../../../public/map-pin.png"
                      alt="location"
                      className={css.map}
                    />
                  </span>
                  {nannie.location}
                  <span>
                    <img src="../../../public/Vector1.png" alt="vector" />
                  </span>
                </div>
                <div className={css.rating}>
                  <span>
                    <img
                      src="../../../public/Star.png"
                      alt="rating"
                      className={css.star}
                    />
                  </span>
                  Rating: {nannie.rating}
                  <span>
                    <img src="../../../public/Vector1.png" alt="vector" />
                  </span>
                </div>
                <div className={css.price}>
                  Price/1 hour:{' '}
                  <span className={css.priceHour}>
                    {nannie.price_per_hour}$
                  </span>
                </div>
              </div>
              <div className={css.heart}>
                <img
                  src="../../../public/heart.png"
                  alt="heart"
                  className={css.heartIcon}
                />
              </div>
            </ul>
          </div>
          <ul className={css.nanniePersonalInfo}>
            <li className={css.age}>
              Age:{' '}
              <span className={css.ageValue}>
                {calculateAge(nannie.birthday)}
              </span>
            </li>
            <li className={css.experience}>Experience: {nannie.experience}</li>
            <li className={css.kidsAge}>Kids Age: {nannie.kids_age}</li>
            <li className={css.characters}>
              Characters: {nannie.characters.join(', ')}
            </li>
            <li className={css.education}>Education: {nannie.education}</li>
          </ul>
          <div className={css.nannieDescription}>{nannie.about}</div>
          <div>
            {!expended && (
              <button className={css.nannieLink} onClick={handleToggleExpend}>
                Reed more
              </button>
            )}
            {expended && (
              <>
                <div className={css.reviews}>
                  {nannie.reviews.length > 0 ? (
                    nannie.reviews.map((review, index) => (
                      <div className={css.userReviewsInfo} key={index}>
                        <div className={css.wrapperReviews}>
                          <span className={css.reviewsAvatar}>
                            {review.reviewer[0].toUpperCase()}
                          </span>
                          <div className={css.reviewsRating}>
                            <p>{review.reviewer}</p>
                            <div className={css.starReviews}>
                              <span>
                                <img
                                  src="../../../public/Star.png"
                                  alt="starReviews"
                                />
                              </span>
                              <p>
                                {Number.isInteger(review.rating)
                                  ? `${review.rating}.0`
                                  : review.rating}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={css.reviewsComment}>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>
                <div>
                  <button
                    className={css.buttonModal}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Make an appointment
                  </button>
                  <AppointmentModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    nannieName={nannie.name}
                    nannieAvatar={nannie.avatar_url}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NanniesCard;
