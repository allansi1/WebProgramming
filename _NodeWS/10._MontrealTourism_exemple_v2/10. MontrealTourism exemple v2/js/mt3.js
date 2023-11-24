
function validate_user() {
    var n = document.forms["form1"]["user_name"].value;
    if (n == "") {
        alert("Name must be filled out");
        return false;
    }
    else {
        if (!(/^[ ]*[A-Z]([a-z]|(([ ]+|-)[A-Z]))*[ ]*$/.test(n))) {
            alert("Invalid name");
            return false;
        }
        else {
            document.forms["form1"]["user_name"].value = n.replace(/[ ][ ]+/g, ' ').replace(/(^[ ])|([ ]$)/g, '');     // remove repeated blanks 
          
            var s = document.forms["form1"]["user_sex"];
            // if we had several radio buttons to test...
            //if (!Array.from(s).some((value) => { return value.checked; })) {  
            if ((!s[0].checked) && (!s[1].checked)) {
                alert("Birth sex must be informed");
                return false;
            }
            else {
                return true;
            }
        }
    }
}