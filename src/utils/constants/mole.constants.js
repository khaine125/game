import { v4 as uuid } from 'uuid';

export const MOLE_SCORE = 100;
export const NUMBER_OF_MOLES = 5;
export const MOLE_COLLECTION = new Array(NUMBER_OF_MOLES).fill().map(() => uuid());
export const POINTS_MULTIPLIER = 0.9;
export const TIME_MULTIPLIER = 1.25;
