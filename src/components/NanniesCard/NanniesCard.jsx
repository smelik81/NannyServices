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
          <p className={css.cardTextNannies}>Nanny</p>
          <h2 className={css.cardNanniesName}>{nannie.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default NanniesCard;
