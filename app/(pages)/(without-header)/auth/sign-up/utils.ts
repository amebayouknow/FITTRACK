import { IForm } from "./page";

export const validateForm = (form: IForm): {isValid: boolean, errorMessage: string} => {
    let isValid = true;
    let errorMessage = "";

    const {email, password, confirmPassword, isAgreed} = form;

    if (!email) {
      errorMessage = "Поле почты пусто";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errorMessage = "Email не подходящей формы";
      isValid = false;
    }

    if (!password) {
      errorMessage = "Поле пароля пусто";
      isValid = false;
    } else if (password.length < 6) {
      errorMessage = "Пароль менее 6 символов";
      isValid = false;
    }

    if (!confirmPassword) {
      errorMessage = "Поле подтверждение пороля пусто";
      isValid = false;
    } else if (password !== confirmPassword) {
      errorMessage = "Пароли не совпадают";
      isValid = false;
    }

    if (!isAgreed) {
      errorMessage = "Вы не согласны с нашими правилами ;3";
      isValid = false;
    }

    return {
        isValid: isValid,
        errorMessage: errorMessage
    };
  };