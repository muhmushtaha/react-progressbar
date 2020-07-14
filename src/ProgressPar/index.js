import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

import './index.scss';

const ProgressBar = (props) => {
  const {
    size,
    bgColor,
    rounded,
    direction,
    percentage,
    onCompleteHandler,
    wrapperCalssName,
    percentageCalssName,
    animated,
  } = props;

  useEffect(() => {
    if (percentage === 100 && onCompleteHandler) {
      onCompleteHandler();
    }
  }, [percentage, onCompleteHandler])

  // wrapper classes
  const roundedCalss = rounded ? 'rounded' : '';
  const wrapperClasses = ['progress-bar-wrapper', size, wrapperCalssName, roundedCalss, direction]

  // percentage classes
  const animatedClass = animated ? 'animated' : '';
  const percentageClasses = ['percentage', percentageCalssName, animatedClass]

  return (
    <div className={wrapperClasses.join(' ')}>
      <div
        className={percentageClasses.join(' ')}
        style={{ backgroundColor: bgColor, width: `${percentage}%` }}
      >
        <span className="label">
          {percentage === 0 ? null : `${percentage}%`}
        </span>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg']).isRequired,
  percentage: PropTypes.number.isRequired,
  wrapperCalssName: PropTypes.string,
  percentageCalssName: PropTypes.string,
  onCompleteHandler: PropTypes.func,
  rounded: PropTypes.bool,
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  animated: PropTypes.bool,
}

ProgressBar.defaultProps = {
  bgColor: '#1a73e8',
  size: 'md',
  percentage: 50,
  onCompleteHandler: undefined,
  direction: 'ltr',
}

const memoizedProgressBar = memo(ProgressBar, isEqual)

export default memoizedProgressBar
