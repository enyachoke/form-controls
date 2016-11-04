import { expect } from 'chai';
import { Obs } from 'src/helpers/Obs';

describe('Obs', () => {
  const concept = {
    uuid: '70645842-be6a-4974-8d5f-45b52990e132',
    name: 'Pulse',
    dataType: 'Text',
  };
  const properties = {
    location: {
      row: 0,
      column: 0,
    },
    mandatory: true,
  };

  const metadata = {
    id: '100',
    type: 'text',
    concept,
    properties,
  };

  const existingObs = {
    concept,
    value: 'abcd',
    formNamespace: 'formUuid/100',
  };

  it('should create a default obs when obs is not passed', () => {
    const obs = new Obs('formUuid', metadata, undefined);
    expect(obs).to.have.property('concept').and.equal(concept);
    expect(obs).to.have.property('formNamespace').and.equal('formUuid/100');
    expect(obs.get()).to.be.eql(undefined);
  });

  it('should update the default obs on setting a value', () => {
    const obs = new Obs('formUuid', metadata, undefined);

    const actualObject = obs.set('345');
    expect(actualObject).to.have.property('concept').and.equal(concept);
    expect(actualObject).to.have.property('formNamespace').and.equal('formUuid/100');
    expect(actualObject).to.have.property('value').and.equal('345');
    expect(actualObject).to.have.property('observationDateTime').to.be.a('null');
    expect(actualObject.get()).to.be.eql('345');
  });

  it('should update an existing obs on setting a value', () => {
    const obs = new Obs('formUuid', metadata, existingObs);

    const actualObject = obs.set('345');
    expect(obs).to.have.property('value').and.equal('abcd');
    expect(actualObject).to.have.property('concept').and.equal(concept);
    expect(actualObject).to.have.property('formNamespace').and.equal('formUuid/100');
    expect(actualObject).to.have.property('value').and.equal('345');
    expect(actualObject).to.have.property('observationDateTime').to.be.a('null');

    expect(actualObject.get()).to.be.eql('345');
  });

  it('should void an obs if a value of undefined is set', () => {
    const obs = new Obs('formUuid', metadata, existingObs);
    const actualObject = obs.void();

    expect(actualObject).to.have.property('concept').and.equal(concept);
    expect(actualObject).to.have.property('formNamespace').and.equal('formUuid/100');
    expect(actualObject).to.have.property('value').and.equal('abcd');
    expect(actualObject).to.have.property('observationDateTime').to.be.eql(undefined);
    expect(actualObject).to.have.property('voided').and.equal(true);
  });

  it('should compare obs', () => {
    const obs = new Obs('formUuid', metadata, existingObs);
    const modifiedObs = obs.set('efgh');

    expect(obs.equals(modifiedObs)).to.be.eql(false);
  });
});
