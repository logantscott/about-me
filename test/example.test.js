// IMPORT MODULES under test here:
// import example from '../src/example.js';
import isYes from '../src/is-yes.js';

const test = QUnit.test;

test('Yes\'s', function(assert) {
    //Arrange
    // Set up your parameters and expectations

    //Act 
    // Call the function you're testing and set the result to a const

    //Assert
    // Make assertions about what is expected valid result
    //assert.equal(true, false);

    //_____________________________________________________
    //ARRANGE get the Input (guess what they might write)
    let input = 'Yes';
    //ARRANGE - what is the expected result
    const expect = true;
    //ACT - get isyes of the input
    const result = isYes(input);
    //ASSERT - assert the isyes with the expected
    assert.equal(result, expect);
    input = 'YES';
    assert.equal(result, expect);
    input = 'Y';
    assert.equal(result, expect);

});

test('No\'s', function(assert) {
    //Arrange
    // Set up your parameters and expectations

    //Act 
    // Call the function you're testing and set the result to a const

    //Assert
    // Make assertions about what is expected valid result
    //assert.equal(true, false);

    //_____________________________________________________
    //ARRANGE get the Input (guess what they might write)
    let input = 'No';
    //ARRANGE - what is the expected result
    const expect = false;
    //ACT - get isyes of the input
    const result = isYes(input);
    //ASSERT - assert the isyes with the expected
    assert.equal(result, expect);
    input = 'NO';
    assert.equal(result, expect);
    input = 'N';
    assert.equal(result, expect);

});