/* globals gauge*/
"use strict";
const path = require('path');
const {
    alert,
    openBrowser,
    write,
    closeBrowser,
    goto,
    click,
    checkBox,
    text,
    textBox,
    button,
    reload,
    currentURL,
    waitFor,
    goBack,
    clear,
    $
} = require('taiko');

beforeSuite(async () => {
    await openBrowser({headless: 'true'})
});

// static pages 
step("Home page", async () => {
    await goto("http://localhost:3000/");
    await click($('#signupLink')) // change this to id of button
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
    await write('test1006')

    // click on text Last Name
    await click($('#lname'))
    await write('user1006')

    // click on text First Name
    await click($('#email'))
    await write('testuser1006@test_user.com')

    // click on text First Name
    await click($('#password'))
    await write('12345678')

    // click on text First Name
    await click($('#password2'))
    await write('12345678')

    await click($('#formButton'))

    await click($('#logout'))


});

step("user log in", async function () {
    await click($('#email'));
    await write('testuser1006@test_user.com')

    await click($('#password'))
    await write('12345678')

    await click($('#formButton'))
});

step("user log in 2", async function () {
    await goto('localhost:3000/login')
    await click($('#email'));
    await write('testuser1006@test_user.com')

    await click($('#password'))
    await write('12345678')

    await click($('#formButton'))
    await goto('http://localhost:3000/userHome/18')
});

// user home

step("left swipe", async function () {
    // hard code url but need to change this. login should redirect to userHome/:user_id of current user
    await goto('http://localhost:3000/userHome/19')
    
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
    await write('test1035')
    // // set up alert so flow is not disrupted
    // alert(async ({message}) => {
    //     await accept();
    //   })
    // // click on update
    // await click($('#formButton'))
    // refresh page
   // await reload(currentURL)
    // click on accordion
    await click($('#profile-settings-header'))
});

step("animal filter", async function () {
    // click on accordion
    await waitFor(2000)
    await click($('#filter-settings-header'))
    // click on drop down and select first entry
    await click(textBox('Shelters'))
    await click(text('Test Shelter No.1'))
    // click on cats
    await click($('#Cat'))
    // click on 1st breed
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

/*
**********************************************************
                        Employee
**********************************************************
    - sign up
    - log in 
        - forgot password not included
    - edit shelter
    - management page
    - edit animal
         - check matches/delete matches
         - add/delete image
         - update 1 attribute and save changes
    - delete animal
         - click on button and refresh page
    - add animal
         - add image, fill out form, save changes
    - log out
*/
step("employee sign up", async function () {
    // redirect to sign up
   // await goto('http://ec2-54-177-253-69.us-west-1.compute.amazonaws.com/signup')
    await goto("http://localhost:3000/");
    // click on sign up link
    await click($('#signupLink'))
    // click on shelter sign up
    await click(button('Shelter Sign Up'))
    // click on Employee switch
    await click(checkBox({id: 'shelter_emp_switch'}))
    // get shelter name
    await click($('#sname'))
    await click(text('Test Shelter No.1'))

    // employee id 
    await click($('#employeeId'))
    await write('12122')

    // click on text First Name
    await click($('#name'))
    await write('etest200')

    // click on text First Name
    await click($('#email'))
    await write('etest200@test_employee.com')

    // click on text First Name
    await click($('#password'))
    await write('12345679')

    // click on text First Name
    await click($('#password2'))
    await write('12345679')

    await click($('#formButton'))

    await click($('#logout'))


});

step("employee log in", async function () {
    await click($('#email'))
    await write('etest200@test_employee.com')

    await click($('#password'))
    await write('12345679')

    await click(button('login'))
});


step("employee log in2", async function () {
    await goto('http://localhost:3000/login')
    await click($('#email'))
    await write('etest200@test_employee.com')

    await click($('#password'))
    await write('12345679')

    await click(button('login'))
});
// user home

step("admin home page", async function () {
   // before click - at home page after successful login from step prior 
   await click($('#nav_admin'))
});

step("edit shelter", async function () {
    await waitFor(2000)
    // toggle form
    await click(button({id: 'editshelter'}))
    // change zip code
    await clear($('#zip'))
    await write('89999')
    // // set up alert so flow is not disrupted
    // alert(async ({message}) => {
    //     await accept();
    //   })
    // // click on update
    // await click(button('Update Shelter Info'))
    // hide form again
    await click($('#hide_shelter_update'))

});

step("admin home redirect add pet", async function () {
    // click on add new animal profile -- this page isnt ready yet 
    await click($('#addpet'))
    // wait for 3 seconds
    await waitFor(3000)
    // go back to admin home 
    await goBack()
});

step("admin home redirect edit pet", async function () {
    // click on edit animal profile 
    await click($('#editpet'))
});

step("edit pet", async function () {
    await goto("localhost:3000/adminHome")
    await waitFor(3000)
    await click($('#editpet'))

    // filter by cat
    await click($('#search'))
    await click(text('Cat'))

    // click on delete button - this works but not running all the way due to limited animal profiles
    await click($('#delete_Paul'))
    await click(button('Cancel'))

    // click on animal profile for edit - paul
    await click($('#Paul'))
});
step("edit pet page", async function () {    
    // add image - limitation in taiko does not allow image upload (off browser action) - allows for file upload but does not work
        // src: https://github.com/getgauge/taiko/blob/master/examples/01-file_upload.js
    // not doing small screen testing -> single component screen changes not tested (matches vs profile)

    // delete image -- not deleting image due to limited animal profiles - will show action and not delete
    await click(button('delete'))
    await click(button('done'))

    // edit matches
    await click(button('edit'))

    // delete
    await click($('#EmployeeTest2_EmployeeTest2'))

    // edit pet name
    await clear($('#name'))
    await write('Pauly')

    // edit description
    await clear($('#textarea'))
    await write("This is an updated description. Replaced Lorem Ipsum.")

    // save changes
    await click(button('Save Changes'))

    // logout
    await click($('#logout'))
});

/*
**********************************************************
                     Shelter
**********************************************************
    - sign up
    - log in 
        - forgot password not included
*/
step("shelter sign up", async function () { 
    await goto("localhost:3000/") 
    // click on sign up link
    await click($('#signupLink'))
    // click on shelter sign up
    await click(button('Shelter Sign Up'))

    // shelter name
    await click($('#sname'))
    await write("Test Shelter No.5")

    // street 
    await click($('#street'))
    await write("128 Adoption St")

    // city
    await click($('#city'))
    await write("San Jose")

    // state
    await click($('#state'))
    await write('CA')

    // zip
    await click($('#zip'))
    await write('99988')

    // email
    await click($('#email'))
    await write('testShelter5@testShelter.com')

    // password
    await click($('#password'))
    await write('12345678')

    // confirm password
    await click($('#password2'))
    await write('12345678')

    await click($('#formButton'))
})

step("shelter log out", async function () { 
    await click($('#logout'))
})

step("shelter sign in", async function () {  
    // email
    await click($('#email'))
    await write('testShelter5@testShelter.com')

    // password
    await click($('#password'))
    await write('12345678')
    await click(button('login'))
    await waitFor(4000)
})

/*
**********************************************************
                        All 
**********************************************************
    - newsfeed
*/

step("newsfeed", async function(){
    // go to news page
    await click($('#nav_news'))
    // sign out
    await click($('#logout'))
})