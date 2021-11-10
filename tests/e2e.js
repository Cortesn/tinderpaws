/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    reload,
    currentURL,
    dropDown,
    goBack,
    clear
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser()
});

afterSuite(async () => {
    await closeBrowser();
});
// static pages 
step("Home page", async () => {
    const url = "http://ec2-54-177-253-69.us-west-1.compute.amazonaws.com/"
    await goto(url);
    await click($('.MuiButton-root')); // change this to id of button
});

step("Mission Page", async function () {
    await click($('#nav_mission'));
    await click($('#signupLink')); // should work once client dir updated in aws
});
/*
**********************************************************
                    User
**********************************************************
    - sign up
    - log in
    - swiping
    - profile update
    - animal card filter
    - matches 
    - log out
*/
step("user sign up", async function () {
    // click on text First Name
    await click($('#fname'))
    await write('test100')

    // click on text Last Name
    await click($('#lname'))
    await write('user100')

    // click on text First Name
    await click($('#email'))
    await write('testuser100@test_user.com')

    // click on text First Name
    await click($('#password'))
    await write('12345678')

    // click on text First Name
    await click($('#password2'))
    await write('12345678')

    await click(button('signup'))

    await click($('#logout'))


});

step("user log in", async function () {
    await click($('#email'));
    await write('testuser100@test_user.com')

    await click($('#password'))
    await write('12345678')

    await click($('#formButton'))
});

// user home

step("left swipe", async function () {
    // hard code url but need to change this. login should redirect to userHome/:user_id of current user
    await goto('http://ec2-54-186-169-222.us-west-2.compute.amazonaws.com/user')
    
    await click($('#leftSwipe'))
});

step("right swipe", async function () {
    await click($('#rightSwipe'))
});

step("profile update", async function () {
    // click on accordion
    await click($('#profile-settings-header'))
    // click on name field, change name
    await clear(click($('#fname')))
    await write('test101')
    // click on update
    await click($('#formButton'))
    // refresh page
    await reload(currentURL)
    // click on accordion
    await click($('#profile-settings-header'))
});

// leaving off here for now
step("animal filter", async function () {
    // click on accordion
    await click($('#filter-settings-header'))
    // click on drop down and select first entry
    await click(textBox('Shelters'))
    await click(text('Test Shelter No.1'))
    // click on cats
    await click($('#Cat'))
    // click on 1st and 2nd breeds
    await click(textBox('Breeds'))
    await click(text('Golden Retriever'))
    // click click on 1st disposition
    await click($('#animals'))
    // click on update
    await click($('#applyAnimalFilter'))
});

step("matches", async function () {
    // click on matches 
    await click($('#matches-header'))
});

step("user log out", async function () {
    // click on log out icon
    await click($('#logout'))
});

// /*
// **********************************************************
//                         Employee
// **********************************************************
//     - sign up
//     - log in 
//         - forgot password not included
//         - click here for sign up not included
//     - edit shelter
//     - management page
//     - edit animal
//          - check matches/delete matches
//          - add/delete image
//          - update 1 attribute and save changes
//     - delete animal
//          - click on button and refresh page
//     - add animal
//          - add image, fill out form, save changes
//     - log out
// */
step("employee sign up", async function () {
    // redirect to sign up
    await goto('http://ec2-54-177-253-69.us-west-1.compute.amazonaws.com/signup')
    // click on shelter sign up
    await click(button('Shelter Sign Up'))
    // click on Employee switch
    await click(checkBox({id: 'shelter_emp_switch'}))
    // get shelter name
    await dropDown('Shelters Name').select({index: '0'})

    // employee id 
    await click($('#employeeId'))

    // click on text First Name
    await click($('#name'))
    await write('etest100')

    // click on text First Name
    await click(text('#email'))
    await write('etest100@test_employee.com')

    // click on text First Name
    await click(text('#password'))
    await write('12345678')

    // click on text First Name
    await click(text('#password2'))
    await write('12345678')

    await click(button('signup'))

    await click(link({id: 'logout'}))


});

step("employee log in", async function () {
    await click($('#email'));
    await write('etest100@test_employee.com')

    await click(text('password'))
    await write('12345678')
});

// user home

step("admin home page", async function () {
    // hard code url but need to change this. login should redirect to userHome/:user_id of current user
    await goto('http://ec2-54-186-169-222.us-west-2.compute.amazonaws.com/admin')
});

step("edit shelter", async function () {
    // toggle form
    await click(button({id: 'editshelter'}))
    // change zip code
    await click(text({id: 'zip'}))
    await write('88899')
    // click on update
    await click(button('Update Shelter Info'))

    // hide form again
    await click($('#hide_shelter_update'))

});

step("admin home redirect add pet", async function () {
    // click on add new animal profile
    await click($('#addpet'))
    // go back to admin home 
    await goBack()
});

step("admin home redirect edit pet", async function () {
    // click on edit animal profile 
    await click($('#editpet'))
    // go back to admin home
    await goBack()
});

step("add pet", async function () {
    // click on matches 
    await click($('#addpet'))
    // not sure what goes in here - need to look @ page

});

step("edit pet", async function () {
    // go to admin home and click on edit pet
    await goto('http://ec2-54-186-169-222.us-west-2.compute.amazonaws.com/admin')
    await click($('#editpet'))

    // click on delete button
    // click on animal profile for edit

});
step("edit pet page", async function () {
    // all functionality for edit page
    // check matches
    // delete match
    // delete image
    // add image
    // edit name
    // save changes

});

// /*
// **********************************************************
//                      Shelter
// **********************************************************
//     - sign up
//     - log in 
//         - forgot password not included
//         - click here for sign up not included
// */

// /*
// **********************************************************
//                         All 
// **********************************************************
//     - newsfeed
// */
