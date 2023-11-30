export enum sportsEnum {
  ROLLER = 'roller',
  TROTTINETTE = 'trottinette',
  QUAD = 'quad',
  SKATE = 'skate',
  BMX = 'bmx',
}

interface StepFormat {
  label: string;
  value: string;
}

const stepFormats: StepFormat[] = [
  { label: 'Qualification et finale', value: 'QUALIFICATION_AND_FINALE' },
  { label: 'Pas de', value: 'QUALIFICATION_AND_FINALE' },
];
