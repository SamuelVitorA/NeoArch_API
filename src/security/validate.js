export function validate(user) {
    const { email, senha: password } = user;

    const at = email.includes("@");
    const dotAfterAt = email.indexOf(".") > email.indexOf("@") + 1;
    const somethingBeforeAt = email.indexOf("@") > 0;
    const somethingAfterDot = email.lastIndexOf(".") < email.length - 1;

    const validEmail = at && dotAfterAt && somethingBeforeAt && somethingAfterDot;

    const longEnough = password.length >= 8;
    const Letter = /[A-Za-z]/.test(password);
    const Number = /[0-9]/.test(password);
    const Uppercase = /[A-Z]/.test(password);

    const validPassword = longEnough && Letter && Number && Uppercase;

    return validEmail && validPassword;
}
