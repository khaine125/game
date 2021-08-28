import * as moleConstants from '../../utils/constants/mole.constants';

function Mole({ onWhack }) {
  return (
    <button onClick={() => onWhack(moleConstants.MOLE_SCORE)}>Mole</button>
  );
}

export default Mole;
