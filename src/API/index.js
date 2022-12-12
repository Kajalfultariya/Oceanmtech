import axios from "axios";
import { headers, headersBus } from "./token";

const url = "https://dev.oceanmtechdmt.in/api/web/v1/";

const apiUrl = {
  login: "login",
  otp: "otp/confirm",
  landingData: "home/content/get",
  saveMsgData: "contact-us/send",
  sliderData: "slider/get",
  homeData: "home/get",
  planData: "plans/get",
  languageLabel: "labels/get/?language_id=",
  busiData: "businesses/get",
  categoryData: "business-category/get",
  addBusinessData: "business/save",
  BackgroundData: "mq/backgrounds/get?page=",
  stickerData: "sticker/get?page=",
  stickerCategoryData: "sticker/category/get",
  quoteData: "mq/quotes/get?page=1&user_language_id=",
  savePostData: "user/download/save",
  saveCustomPostData: "user/custum-post/download/save",
  quoteCategoryData: "mq/category/get",
  framedata: "frames/get?user_name=",
  cframedata: "home/custom-frame/get?post_type=Post",
  profileType: "profile/type/get",
  languageAppData: "languages/app",
  politicalType: "political/party/get",
  delUser: "user/delete",
  delBusi: "business/delete?business_id=",
  frameData: "frame/update",
  singleBusiData: "business/get?business_id=",
  deafultBusi: "business/default/set?business_id=",
  eventPageData: "event/data/get?event_id=",
  categoryPageData: "data/get?home_category_id=",
  businessPageData: "business-data/get?business_category_id=",
  savedown: "user/download/save",
  useLang: "languages/user??home_category_id=",
  addProfileData: "user/save",
  getProfile: "profile/get",
  countryData: "countries/get",
  stateData: "states/get?country_id=",
  cityData: "cities/get?state_id=",
  religiondata: "religions/get",
  languageData: "languages/user",
  dbvcList: "home/visiting-cards/get",
  fontData: "fonts/get",
  getDownloadPost: "saved/post/get?type=",
  logoData: "home/logo/get",
  feedbackSave: "feedback/save",
  customFrame: "custom/frames/get?post_type=",
  termData: "cms/get?slug=",
  getPayment: "payment/method/get",
  addOrder: "order/save",
  callOrder: "order/payment/save",
  getOrder: "orders/get?type=",
  saveTrans: "transaction/save",
  getTrans: "transactions/get?s&status=Success&from_date&to_date",
  planHistory: "user/plan/history",
  notificaData: "notifications/get",
  delLogo: "user/logo/delete",
  tempData: "templates/get?page="
}


const getTempData = async (page) => {

  try {
    const res = await axios.get(
      url + apiUrl.tempData + page,

      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const PostDelLogo = async () => {

  try {
    const res = await axios.post(
      url + apiUrl.delLogo, " ",

      {
        mode: "no-cors",
        headers: headers,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const getNotificData = async () => {

  try {
    const res = await axios.get(
      url + apiUrl.notificaData,

      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getPlanHistory = async () => {

  try {
    const res = await axios.get(
      url + apiUrl.planHistory,

      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getTransData = async () => {

  try {
    const res = await axios.get(
      url + apiUrl.getTrans + "&status&order_date=&s",

      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postSaveTrans = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.saveTrans,
      fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const getOrderData = async (data) => {

  try {
    const res = await axios.get(
      url + apiUrl.getOrder + data + "&status&order_date=&s",

      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postCallOrder = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.callOrder,
      fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postAddOrder = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.addOrder,
      fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const getCustomframeData = async (type, id) => {
  try {
    const res = await axios.get(url + apiUrl.customFrame + type + "&business_id=" + id, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getPaymentData = async () => {
  try {
    const res = await axios.get(url + apiUrl.getPayment, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getcframeData = async () => {
  try {
    const res = await axios.get(url + apiUrl.cframedata, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getLogoList = async () => {
  try {
    const res = await axios.get(url + apiUrl.logoData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getDownloadPostList = async (type) => {
  try {
    const res = await axios.get(url + apiUrl.getDownloadPost + type, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getFontList = async () => {
  try {
    const res = await axios.get(url + apiUrl.fontData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getDbvcList = async () => {
  try {
    const res = await axios.get(url + apiUrl.dbvcList, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getReligionData = async () => {
  try {
    const res = await axios.get(url + apiUrl.religiondata, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getLanguageData = async () => {
  try {
    const res = await axios.get(url + apiUrl.languageData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const postAddProfileData = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.addProfileData,
      fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const postFeedbackSave = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.feedbackSave,
      fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getProfileData = async () => {
  try {
    const res = await axios.get(url + apiUrl.getProfile, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getuserLang = async (bid, pt, ty) => {

  try {
    const res = await axios.get(url + apiUrl.useLang +
      "&business_category_id=" + bid + "&post_type=" + pt + "&type=" + ty + "&data_type=Data&event_id=", {
      mode: "no-cors",
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getSaveDownloadFrame = async (data) => {
  try {
    const res = await axios.post(url + apiUrl.savedown, data, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const geteventpagedata = async (catid, page, lan, post, image) => {

  try {
    const res = await axios.get(url + apiUrl.eventPageData + catid +
      "&page=" + page + "&language_id=" + lan + "&post_type=" + post + "&type=" + image, {
      mode: "no-cors",
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getcatpagedata = async (catid, page, lan, post, image) => {

  try {
    const res = await axios.get(url + apiUrl.categoryPageData + catid +
      "&page=" + page + "&language_id=" + lan + "&post_type=" + post + "&type=" + image, {
      mode: "no-cors",
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getbusipagedata = async (bid, page, lan, post, image) => {

  try {
    const res = await axios.get(url + apiUrl.businessPageData + bid +
      "&page=" + page + "&language_id=" + lan + "&post_type=" + post + "&type=" + image, {
      mode: "no-cors",
      headers: headers,
    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const deleteUser = async () => {

  try {
    const res = await axios.post(url + apiUrl.delUser, "", {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const deleteBusiness = async (id) => {

  try {
    const res = await axios.post(url + apiUrl.delBusi + id, "", {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const defaultBusiness = async (id) => {

  try {
    const res = await axios.post(url + apiUrl.deafultBusi + id, "", {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getPoliticalType = async () => {
  try {
    const res = await axios.get(url + apiUrl.politicalType,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getProfileType = async () => {
  try {
    const res = await axios.get(url + apiUrl.profileType,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getFrameData = async (username, busname, tag, em, webs, adr, mnf, mns, fid, iid, ffid, bid) => {
  try {
    const res = await axios.get(url + apiUrl.framedata + username +
      "&business_name=" + busname +
      "&business_tagline=" + tag + "&email=" + em +
      "&website=" + webs +
      "&address=" + adr +
      "&mobile_no=" + mnf +
      "&mobile_no1=" + mns +
      "&fb_id=" + fid +
      "&instagram_id=" + iid +
      "&frame_type_id=" + ffid +
      "&social_icon=0&business_id=" + bid,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getTermData = async (sg) => {

  try {
    const res = await axios.get(
      url + apiUrl.termData + sg,
      {
        "Content-type": "application/json",
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postLogin = async (payload) => {

  try {
    const res = await axios.post(
      url + apiUrl.login, payload,
      {
        "Content-type": "application/json",
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postOtp = async (payload) => {

  try {
    const res = await axios.post(
      url + apiUrl.otp, payload,
      {
        "Content-type": "application/json",
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const getBusinessData = async () => {
  try {
    const res = await axios.get(url + apiUrl.busiData,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getSingleBusinessData = async (id) => {
  try {
    const res = await axios.get(url + apiUrl.singleBusiData + id,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getData = async (type) => {
  try {
    const res = await axios.get(url + apiUrl.homeData + "?post_type=" + type + "&type=Image&cacheCleared",
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getSliderData = async () => {
  try {
    const res = await axios.get(url + apiUrl.sliderData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getLandingData = async () => {
  try {
    const res = await axios.get(
      url + apiUrl.landingData,
      {
        "Content-type": "application/json",
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postSaveMsgData = async (cData) => {

  try {
    const res = await axios.post(
      url + apiUrl.saveMsgData, cData,
      {
        "Content-type": "application/json",
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const getPlanData = async () => {
  try {
    const res = await axios.get(url + apiUrl.planData,
      {
        mode: "no-cors",
        headers: headers,

      });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getBackgroundData = async (no, id) => {
  console.log("no and id", no, id)
  try {
    const res = await axios.get(url + apiUrl.BackgroundData + no + "&business_category_id=" + id, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getStickerData = async (id) => {
  try {
    const res = await axios.get(url + apiUrl.stickerData + 1 + "&sticker_category_id=" + id, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getStickerCategoryData = async () => {
  try {
    const res = await axios.get(url + apiUrl.stickerCategoryData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getQuoteData = async (id) => {
  try {
    const res = await axios.get(url + apiUrl.quoteData + 1 + "&category_id=" + id, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getQuoteCategoryData = async () => {
  try {
    const res = await axios.get(url + apiUrl.quoteCategoryData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const postsavePostdata = async (data) => {

  try {
    const res = await axios.post(url + apiUrl.savePostData, data, {
      mode: "no-cors",
      headers: headers,

    });
    //  console.log("api reaponse", res)
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const postSaveCustomPostdata = async (data) => {

  try {
    const res = await axios.post(url + apiUrl.saveCustomPostData, data, {
      mode: "no-cors",
      headers: headers,

    });
    //  console.log("api reaponse", res)
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getLanguageLabelData = async (lid) => {
  //console.log("cid",cid)
  try {
    const res = await axios.get(url + apiUrl.languageLabel + lid, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getCategoryData = async () => {
  try {
    const res = await axios.get(url + apiUrl.categoryData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const postAddBusinessData = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.addBusinessData, fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const postFrame = async (fdata) => {
  console.log("payload", fdata);
  try {
    const res = await axios.post(
      url + apiUrl.frameData, fdata,
      {
        mode: "no-cors",
        headers: headersBus,
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};


const getCountryData = async () => {
  try {
    const res = await axios.get(url + apiUrl.countryData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

const getStateData = async (cid) => {
  //console.log("cid",cid)
  try {
    const res = await axios.get(url + apiUrl.stateData + cid, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};
const getCityData = async (sid) => {
  try {
    const res = await axios.get(url + apiUrl.cityData + sid, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};


const getLanguageAppData = async () => {
  try {
    const res = await axios.get(url + apiUrl.languageAppData, {
      mode: "no-cors",
      headers: headers,

    });
    return res.data;
  } catch (err) {
    console.error({ err });
  }
};

export {
  getuserLang,
  getSliderData,
  getLandingData,
  postSaveMsgData,
  getData,
  getPlanData,
  getLanguageLabelData,
  postLogin,
  postOtp,
  getBusinessData,
  getCategoryData,
  postAddBusinessData,
  getFrameData,
  getProfileType,
  getPoliticalType,
  deleteBusiness,
  deleteUser,
  postFrame,
  getSingleBusinessData,
  defaultBusiness,
  getbusipagedata,
  geteventpagedata,
  getcatpagedata,
  getSaveDownloadFrame,
  postAddProfileData,
  getProfileData,
  getCountryData,
  getStateData,
  getCityData,
  getReligionData,
  getLanguageData,
  getBackgroundData,
  getQuoteData,
  postsavePostdata,
  getQuoteCategoryData,
  getLogoList,
  getStickerCategoryData,
  getStickerData,
  getLanguageAppData,
  getcframeData,
  getDbvcList,
  getFontList,
  postSaveCustomPostdata,
  getDownloadPostList,
  postFeedbackSave,
  getCustomframeData,
  getTermData,
  postAddOrder,
  getOrderData,
  getPaymentData,
  getNotificData,
  postCallOrder,
  postSaveTrans,
  getTransData,
  getPlanHistory,
  PostDelLogo,
  getTempData
}