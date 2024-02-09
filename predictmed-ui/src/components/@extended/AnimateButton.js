import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

export default function AnimateButton({ children, type }) {
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      );
}

AnimateButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['slide', 'scale', 'rotate'])
};

AnimateButton.defaultProps = {
  type: 'scale'
};
