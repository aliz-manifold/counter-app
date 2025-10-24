// Validation utilities for annotation form

export const COST_ESTIMATE_MIN = 0;
export const COST_ESTIMATE_MAX = 10000000;

export function validateCostEstimate(value) {
  if (value === null || value === undefined || value === '') {
    return true; // Optional field
  }

  if (value < COST_ESTIMATE_MIN) {
    return {
      valid: false,
      message: 'Cost estimate must be positive.',
    };
  }

  return {  valid: true };
}

export function validateQuestions(responses, requiredQuestions) {
  const unanswered = [];

  for (const question of requiredQuestions) {
    if (!responses[question]) {
      unanswered.push(question);
    }
  }

  if (unanswered.length > 0) {
    return {
      valid: false,
      message: 'Please answer all questions.',
      unanswered,
    };
  }

  return { valid: true };
}

export function validateTSPIncidents(incidents) {
  const invalidIncidents = incidents
    .filter(i => i.fromTsp)
    .filter(i => i.name !== 'Manual Selection')
    .filter(i => i.accuracy !== 0 && i.accuracy !== 1);

  if (invalidIncidents.length > 0) {
    return {
      valid: false,
      message: 'Please select accuracy for all TSP incidents.',
    };
  }

  return { valid: true };
}

export function validateAccidentFields(isAccident, nofaultAccident, costEstimate) {
  if (!isAccident) {
    return { valid: true };
  }

  if (nofaultAccident === null) {
    return {
      valid: false,
      message: 'Please select driver fault status.',
    };
  }


  return { valid: true };
}

export function validateIncidentTypes(incidents, incidentTypes) {

  const invalidIncidents = incidents
    .filter(i => !i.fromTsp)
    .filter(i => !i.name || i.name.length === 0);

  if (invalidIncidents.length > 0) {
    return {
      valid: false,
      message: 'Please select event type for all incidents.',
    };
  }

  const incidentsNeedingIntensity = incidents.filter(i => {
    const type = incidentTypes.find(t => t.translatedType === i.name);
    return type?.hasIntensity === true;
  });

  return { valid: true };
}
