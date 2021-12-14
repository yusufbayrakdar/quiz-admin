import { TOKEN } from "../utils";
import _fetch from "./CustomHttpService";

class Query {
  search: string;
  isActive: boolean;
  page: string;
  limit: string;
}
class Api {
  // GET request
  _doGet = (endpoint: string) => {
    return _fetch({
      method: "GET",
      endpoint,
    });
  };

  _doGetWithAuth = (endpoint: string) => {
    return _fetch({
      method: "GET",
      endpoint,
      headers: { tokenstaff: localStorage.getItem(TOKEN) },
    });
  };

  // POST request
  _doPost = (endpoint: string, body: object, isFormData = false) => {
    return _fetch({
      method: "POST",
      body,
      endpoint,
      isFormData,
    });
  };

  _doPostWithAuth = (endpoint: string, body: object, isFormData = false) => {
    return _fetch({
      method: "POST",
      body,
      endpoint,
      headers: { tokenstaff: localStorage.getItem(TOKEN) },
      isFormData,
    });
  };

  _doDeleteWithAuth = (endpoint: string) => {
    return _fetch({
      method: "DELETE",
      endpoint,
      headers: { tokenstaff: localStorage.getItem(TOKEN) },
    });
  };

  objectToQueryString(obj: any) {
    if (typeof obj !== "object") return "";

    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&") ? "?" + str.join("&") : "";
  }

  getInstructors = (payload: Query) => {
    const query = this.objectToQueryString(payload);
    return this._doGetWithAuth(`/instructors${query}`);
  };

  getInstructorDetail = (payload: Query) => {
    return this._doGetWithAuth(`/instructors/${payload}`);
  };

  confirmInstructor = (_id: string) => {
    return this._doGetWithAuth(`/instructors/${_id}/confirm`);
  };

  cancelInstructor = (_id: string) => {
    return this._doGetWithAuth(`/instructors/${_id}/cancel`);
  };

  getStudents = (payload: Query) => {
    const query = this.objectToQueryString(payload);
    return this._doGetWithAuth(`/students${query}`);
  };

  login = (payload: object) => {
    return this._doPost("/auth/login-staff", payload);
  };

  signupInstructor = (payload: object) => {
    return this._doPost("/auth/register/instructor", payload);
  };

  autoLogin = () => {
    return this._doGetWithAuth("/staffs/profile");
  };
}

export default new Api();
