// IMPORT MODULES under test here:
// import example from '../src/example.js';
//import { isYes, isNo, lcase } from '../src/is-yes.js';

const test = QUnit.test;

test('compare numbers', function(assert) {
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
    const result = isYes(lcase(input));
    //ASSERT - assert the isyes with the expected
    assert.equal(result, expect);
    input = 'YES';
    assert.equal(result, expect);
    input = 'Y';
    assert.equal(result, expect);

});