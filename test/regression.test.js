import { priceValidationTest } from './price_validation.test.js';
import { duplicateBookingTest, teardown } from './duplicate_booking.test.js';

export default function() { 
    priceValidationTest();
    duplicateBookingTest();
 };

 export { teardown };