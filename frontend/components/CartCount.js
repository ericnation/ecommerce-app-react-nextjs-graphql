import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AnimationStyles = styled.span`
	position: relative;
	.count {
		display: block;
		position: relative;
		transition: all .3s;
		backface-visibility: hidden;
	}
  // initial state
  .count-enter {
    transform: rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`;

const Dot = styled.div`
	background: ${props => props.theme.red};
	color: #fff;
	border-radius: 50%;
	padding: 0.5rem;
	line-height: 2rem;
	min-width: 3rem;
	margin-left: 1rem;
	font-weight: 100;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => {
	return (
		<AnimationStyles>
			<TransitionGroup>
				<CSSTransition
					unmountOnExit
					className="count"
					classNames="count"
					key={count}
					timeout={{ enter: 3000, exit: 3000 }}
				>
					<Dot>{count}</Dot>
				</CSSTransition>
			</TransitionGroup>
		</AnimationStyles>
	);
};

export default CartCount;
