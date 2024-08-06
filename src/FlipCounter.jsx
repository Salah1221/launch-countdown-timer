import "./FlipCounter.css";
import PropTypes from "prop-types";

const FlipCounter = ({ current, next, isFlipped }) => {
  return (
    <div className="container">
      <span className="number next">{(next < 10 ? "0" : "") + next}</span>
      <div className={`upper-part${isFlipped ? " flip" : ""}`}>
        <div className="front">
          <span className="number current">
            {(current < 10 ? "0" : "") + current}
          </span>
        </div>
        <div className="back">
          <span className="number next">{(next < 10 ? "0" : "") + next}</span>
        </div>
      </div>
      <div className="lower-part">
        <span className="number current">
          {(current < 10 ? "0" : "") + current}
        </span>
      </div>
      <span className="circle left"></span>
      <span className="circle right"></span>
    </div>
  );
};

export default FlipCounter;

FlipCounter.propTypes = {
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};
