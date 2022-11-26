import store from "../redux/configureStore";
import {getCategoryLocalizedId} from "../utils/index";

const ROLES = {
  ADMIN: "admin",
  DESIGNER: "designer",
  EDITOR_ADMIN: "editorAdmin",
  EDITOR: "editor",
  CUSTOMER_SUPPORT: "customerSupport"
};

export const CAN = {
  ACTIVATE: "ACTIVATE",
  AUDIO_UPLOAD: "AUDIO_UPLOAD",
  CREATE: "CREATE",
  DEACTIVATE: "DEACTIVATE",
  DETAIL_VIEW: "DETAIL_VIEW",
  READ_LISTEN: "READ_LISTEN",
  IMAGE_UPLOAD: "IMAGE_UPLOAD",
  SEARCH: "SEARCH",
  EDIT: "EDIT",
  EDIT_INFO: "EDIT_INFO",
  EDIT_BOOKS: "EDIT_BOOKS",
  VIEW_FORM: "VIEW_FORM",
  LIST_VIEW: "LIST_VIEW",
  HARD_DELETE: "HARD_DELETE",
  SORT: "SORT",
  SHUFFLE: "SHUFFLE",
  CONFIRM_EMAIL: "CONFIRM_EMAIL",
  MAKE_PREMIUM: "MAKE_PREMIUM",
  DELETE_USER: "DELETE_USER",
  CSV_DOWNLOAD: "CSV_DOWNLOAD",
  VIEW_STATS: "VIEW_STATS",
  CACHE_FLUSH: "CACHE_FLUSH",
  LIST_CONFIG: "LIST_CONFIG",
  EDIT_CONFIG: "EDIT_CONFIG",
  VIEW_LOGS: "VIEW_LOGS",
  LIST_USERS: "LIST_USERS",
  FILTER: "FILTER",
  REQUEST_USER_DELETION: "REQUEST_USER_DELETION"
};

export const D = {
  dashboard: "dashboard",
  block: "block",
  summary: "summary",
  author: "author",
  user: "user",
  staff: "staff",
  searchTrend: "searchTrend",
  settings: "settings",
  compositionList: "compositionList",
  category: "category",
  dailyPick: "dailyPick",
  promotion: "promotion"
};

// prettier-ignore
export const PERMITS = {
  [ROLES.ADMIN]: {
    [D.dashboard]: [CAN.LIST_VIEW],
    [D.block]: [CAN.ACTIVATE, CAN.CREATE, CAN.DEACTIVATE, CAN.EDIT, CAN.VIEW_FORM, CAN.SORT],
    [D.summary]: [CAN.ACTIVATE, CAN.READ_LISTEN, CAN.DEACTIVATE, CAN.AUDIO_UPLOAD, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.EDIT, CAN.LIST_VIEW, CAN.SORT, CAN.FILTER, CAN.VIEW_LOGS],
    [D.author]: [CAN.CREATE, CAN.DETAIL_VIEW, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.CSV_DOWNLOAD],
    [D.user]: [CAN.DETAIL_VIEW, CAN.SEARCH, CAN.LIST_VIEW, CAN.MAKE_PREMIUM, CAN.CONFIRM_EMAIL, CAN.DELETE_USER, CAN.REQUEST_USER_DELETION],
    [D.staff]: [CAN.DETAIL_VIEW, CAN.SEARCH, CAN.LIST_VIEW, CAN.CREATE, CAN.EDIT, CAN.VIEW_FORM, CAN.VIEW_LOGS],
    [D.searchTrend]: [CAN.LIST_VIEW, CAN.ACTIVATE, CAN.DEACTIVATE],
    [D.compositionList]: [CAN.ACTIVATE, CAN.DEACTIVATE, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.SORT],
    [D.category]: [CAN.CSV_DOWNLOAD, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT_INFO, CAN.VIEW_FORM, CAN.EDIT_BOOKS, CAN.LIST_VIEW, CAN.SORT, CAN.SHUFFLE],
    [D.settings]: [CAN.CACHE_FLUSH, CAN.LIST_CONFIG, CAN.EDIT_CONFIG],
    [D.promotion]: [CAN.ACTIVATE, CAN.DEACTIVATE, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.LIST_USERS, CAN.CSV_DOWNLOAD]
  },
  [ROLES.EDITOR_ADMIN]: {
    [D.dashboard]: [CAN.LIST_VIEW],
    [D.block]: [CAN.ACTIVATE, CAN.CREATE, CAN.DEACTIVATE, CAN.EDIT, CAN.VIEW_FORM, CAN.SORT],
    [D.summary]: [CAN.ACTIVATE,CAN.READ_LISTEN, CAN.DEACTIVATE, CAN.AUDIO_UPLOAD, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.SORT, CAN.FILTER],
    [D.author]: [CAN.CREATE, CAN.DETAIL_VIEW, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.CSV_DOWNLOAD],
    [D.user]: [CAN.DETAIL_VIEW, CAN.SEARCH, CAN.LIST_VIEW, CAN.CONFIRM_EMAIL,CAN.REQUEST_USER_DELETION],
    [D.searchTrend]: [CAN.LIST_VIEW, CAN.ACTIVATE, CAN.DEACTIVATE],
    [D.compositionList]: [CAN.ACTIVATE, CAN.DEACTIVATE, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.EDIT, CAN.LIST_VIEW, CAN.SORT],
    [D.category]: [CAN.CSV_DOWNLOAD, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT_INFO, CAN.VIEW_FORM, CAN.EDIT_BOOKS, CAN.LIST_VIEW, CAN.SORT, CAN.SHUFFLE],
    [D.promotion]: [CAN.ACTIVATE, CAN.DEACTIVATE, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.EDIT, CAN.LIST_VIEW, CAN.LIST_USERS, CAN.CSV_DOWNLOAD]
  },
  [ROLES.EDITOR]: {
    [D.summary]: [CAN.AUDIO_UPLOAD,CAN.READ_LISTEN, CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW, CAN.FILTER, CAN.SORT],
    [D.author]: [CAN.CREATE, CAN.DETAIL_VIEW, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW],
    [D.compositionList]: [CAN.CREATE, CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.EDIT, CAN.VIEW_FORM, CAN.LIST_VIEW],
    [D.category]: [CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.LIST_VIEW],
  },
  [ROLES.DESIGNER]: {
    [D.summary]: [CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.LIST_VIEW, CAN.FILTER],
    [D.compositionList]: [CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.LIST_VIEW, CAN.SORT],
    [D.category]: [CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.SEARCH, CAN.LIST_VIEW,  CAN.VIEW_FORM],
    [D.promotion]: [CAN.DETAIL_VIEW, CAN.IMAGE_UPLOAD, CAN.VIEW_FORM, CAN.SEARCH, CAN.LIST_VIEW]
  },
  [ROLES.CUSTOMER_SUPPORT]: {
    [D.user]: [CAN.DETAIL_VIEW, CAN.SEARCH, CAN.LIST_VIEW, CAN.CONFIRM_EMAIL, CAN.REQUEST_USER_DELETION],
    [D.summary]: [CAN.SEARCH, CAN.LIST_VIEW, CAN.FILTER],
    [D.promotion]: [CAN.DETAIL_VIEW, CAN.SEARCH, CAN.LIST_VIEW, CAN.LIST_USERS, CAN.CSV_DOWNLOAD],
  }
};

const routes = {
  Dashboard: "/",
  DashboardReports: "/dashboard/reports",
  DashboardEvents: "/dashboard/events",
  DashboardDistribution: "/dashboard/iap-distribution",
  DashboardKPI: "/dashboard/kpi",
  Blocks: "/blocks",
  Sliders: "/blocks/sliders",
  Highlighteds: "/blocks/highlighteds",
  Summaries: "/summaries",
  SummariesCreate: "/summaries/create",
  SummariesStats: "/summaries/stats",
  SummariesId: "/summaries/:_id",
  SummariesIdCreatePart: "/summaries/:_id/create-part",
  SummariesIdEdit: "/summaries/:_id/edit",
  SummariesIdRead: "/summaries/:_id/read",
  SummariesIdListen: "/summaries/:_id/listen",
  Users: "/users",
  UsersGuest: "/users/guest",
  UsersFeedback: "/users/feedbacks",
  DeletionRequest: "/users/deletion-requests",
  SummaryRate: "/summaries/rates",
  UsersId: "/users/:_id",
  SearchTrends: "/search-trends",
  SearchTrendsDesireds: "/search-trends/desireds",
  SearchTrendsStats: "/search-trends/stats",
  SearchTrendsCustomResults: "/search-trends/custom-results",
  SettingsCache: "/settings/cache",
  SettingsConfig: "/settings/config",
  SettingsRevenueUpload: "/settings/revenue-upload",
  Authors: "/authors",
  AuthorsCreate: "/authors/create",
  AuthorSort: "/authors/sort",
  AuthorsId: "/authors/:_id",
  AuthorsIdEdit: "/authors/:_id/edit",
  CompositionLists: "/composition-lists",
  CompositionListsCreate: "/composition-lists/create",
  CompositionListsSort: "/composition-lists/sort",
  CompositionListsId: "/composition-lists/:_id",
  CompositionListsIdEdit: "/composition-lists/:_id/edit",
  Categories: "/categories",
  CategoriesCreate: "/categories/create",
  CategoriesSort: "/categories/sort",
  CategoriesDistribution: "/categories/distribution",
  CategoriesPopularSummaries: "/categories/" + getCategoryLocalizedId("POPULER_SUMMARIES"),
  CategoriesEditorChoice: "/categories/" + getCategoryLocalizedId("EDITOR_CHOICE"),
  CategoriesStory: "/categories/" + getCategoryLocalizedId("STORY"),
  CategoriesId: "/categories/:_id",
  CategoriesIdEdit: "/categories/:_id/edit",
  CategoriesIdSort: "/categories/:_id/sort",
  DailyPickPlanned: "/daily-picks",
  Promotions: "/promotions",
  PromotionsCreate: "/promotions/create",
  PromotionsId: "/promotions/:_id",
  PromotionsIdEdit: "/promotions/:_id/edit",
  StaffActivities: "/staff/activities",
  StaffList: "/staff/list",
  StaffId: "/staff/:_id",
  PushNotification: "/push-notification"
};

const initialPage = {
  [ROLES.ADMIN]: routes.Dashboard,
  [ROLES.EDITOR_ADMIN]: routes.Dashboard,
  [ROLES.EDITOR]: routes.Summaries,
  [ROLES.DESIGNER]: routes.Summaries,
  [ROLES.CUSTOMER_SUPPORT]: routes.Users
};

export const ROUTES = routes;

const PERMIT_FOR_ROUTES = {
  [ROLES.ADMIN]: Object.values(routes),
  [ROLES.EDITOR_ADMIN]: [
    routes.Dashboard,
    routes.DashboardReports,
    routes.DashboardEvents,
    routes.Blocks,
    routes.Sliders,
    routes.Highlighteds,
    routes.Summaries,
    routes.SummariesCreate,
    routes.SummariesStats,
    routes.SummariesId,
    routes.SummariesIdCreatePart,
    routes.SummariesIdEdit,
    routes.SummariesIdRead,
    routes.SummariesIdListen,
    routes.Authors,
    routes.AuthorsCreate,
    routes.AuthorSort,
    routes.AuthorsId,
    routes.AuthorsIdEdit,
    routes.CompositionLists,
    routes.CompositionListsCreate,
    routes.CompositionListsSort,
    routes.CompositionListsId,
    routes.CompositionListsIdEdit,
    routes.Categories,
    routes.CategoriesCreate,
    routes.CategoriesSort,
    routes.CategoriesDistribution,
    routes.CategoriesPopularSummaries,
    routes.CategoriesEditorChoice,
    routes.CategoriesStory,
    routes.CategoriesId,
    routes.CategoriesIdEdit,
    routes.CategoriesIdSort,
    routes.DailyPickPlanned,
    routes.Promotions,
    routes.PromotionsCreate,
    routes.PromotionsId,
    routes.PromotionsIdEdit,
    routes.Users,
    routes.UsersFeedback,
    routes.UsersGuest,
    routes.UsersId,
    routes.SearchTrends,
    routes.SearchTrendsDesireds,
    routes.SearchTrendsStats,
    routes.SummaryRate
  ],
  [ROLES.EDITOR]: [
    routes.Summaries,
    routes.SummariesCreate,
    routes.SummariesId,
    routes.SummariesIdCreatePart,
    routes.SummariesIdEdit,
    routes.SummariesIdRead,
    routes.SummariesIdListen,
    routes.Authors,
    routes.AuthorsCreate,
    routes.AuthorSort,
    routes.AuthorsId,
    routes.AuthorsIdEdit,
    routes.CompositionLists,
    routes.CompositionListsCreate,
    routes.CompositionListsId,
    routes.CompositionListsIdEdit,
    routes.Categories,
    routes.CategoriesPopularSummaries,
    routes.CategoriesEditorChoice,
    routes.CategoriesStory,
    routes.CategoriesId,
    routes.CategoriesIdEdit,
    routes.DailyPickPlanned
  ],
  [ROLES.DESIGNER]: [
    routes.Summaries,
    routes.SummariesId,
    routes.SummariesIdEdit,
    routes.CompositionLists,
    routes.CompositionListsId,
    routes.CompositionListsIdEdit,
    routes.Categories,
    routes.CategoriesId,
    routes.CategoriesIdEdit
  ],
  [ROLES.CUSTOMER_SUPPORT]: [
    routes.Users,
    routes.UsersGuest,
    routes.UsersFeedback,
    routes.UsersId,
    routes.Summaries,
    routes.CompositionLists,
    routes.CompositionListsId,
    routes.Promotions,
    routes.PromotionsId,
    routes.DailyPickPlanned,
    routes.SummaryRate
  ]
};

export const isRoutePermitted = ({pathName}) => {
  const {user} = store.getState().auth;
  return PERMIT_FOR_ROUTES[user?.role]?.includes(pathName);
};

export const filterPermittedItems = routes => {
  const {user} = store.getState().auth;

  let filteredRoutes = routes.filter(({path}) => PERMIT_FOR_ROUTES[user?.role]?.includes(path));

  if (!filteredRoutes.find(e => e.path === ROUTES.Dashboard)) {
    filteredRoutes = [{path: ROUTES.Dashboard, name: "", redirect: initialPage[user?.role]}, ...filteredRoutes];
  }

  return filteredRoutes;
};
