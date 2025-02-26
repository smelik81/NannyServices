import css from './NanniesCard.module.css';

const NanniesCard = ({ nannie }) => {
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
            <li className={css.age}>{nannie.age}</li>
            <li className={css.experience}>{nannie.experience}</li>
            <li className={css.kidsAge}>{nannie.kids_age}</li>
            <li className={css.characters}>{nannie.characters}</li>
            <li className={css.education}>{nannie.education}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NanniesCard;
