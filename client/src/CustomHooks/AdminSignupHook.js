import { useState } from "react";

const UseSignup = () => {
    // signupInfo
    const [SignUpInfo, setSignUpInfo] = useState({
        name: "",
        email: "",
        company: "",
        password: ""
    });

    //signup warnings
    const [SignUpInfoWarning, setSignUpInfoWarning] = useState({
        nameWarning: "",
        emailWarning: "",
        companyWarning: "",
    });

    // password warnings
    const [passwordWarning, setPasswordWarning] = useState({
        CharacterLength: false,
        IsNumberAvailable: false,
        IsLowerAndUpperCase: false
    });

    // password validator
    const validatePassword = (password) => {
        return {
            CharacterLength: password.length >= 8,
            IsNumberAvailable: /\d/.test(password),
            IsLowerAndUpperCase: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
        };
    };


    // password change
    const onPasswordChange = (e) => {
        const value = e.target.value;
        setSignUpInfo((prev) => ({ ...prev, password: value }));
        setPasswordWarning(validatePassword(value));
    };

    //   form handling  
    const OnInputHandel = (e) => {
        const { name, value } = e.target
        setSignUpInfo({
            ...SignUpInfo,
            [name]: value
        })
    }


    // form handle
    const OnFormHandel = () => {
        let newSignupWaring = {
            nameWarning: "",
            emailWarning: "",
            companyWarning: "",
        }

        if (SignUpInfo.name.length < 6) {
            newSignupWaring.nameWarning = "Name can't be less then 5 characters "
        }
        else {
            newSignupWaring.nameWarning = ""
        }

        // email

        if (SignUpInfo.email.length < 6) {
            newSignupWaring.emailWarning = "email can't be less then 5 characters "
        }
        else {
            newSignupWaring.emailWarning = ""
        }
        // company

        if (SignUpInfo.company.length < 5) {
            newSignupWaring.companyWarning = "Company can't be less then 4 characters "
        }
        else {
            newSignupWaring.companyWarning = ""
        }
        setSignUpInfoWarning(newSignupWaring)

        if (Object.values(SignUpInfoWarning).every(val => val === "") &&
            Object.values(passwordWarning).every((val) => val === true)
        ) {
            // api call
            console.log(SignUpInfo)
        }
    }
    return { SignUpInfo, SignUpInfoWarning, passwordWarning, onPasswordChange, OnInputHandel, OnFormHandel };
};

export default UseSignup;
