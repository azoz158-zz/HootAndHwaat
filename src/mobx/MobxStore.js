import { observable, action } from 'mobx'
import LocalizedStrings from 'react-native-localization';

class ObservableListStore {
  trips = [];
  @observable selectedTrip = null;
  @observable selectedFish = null;
  @observable loggedIn = false;
  @observable cities = [];
  @observable marines = [];
  @observable userType = null;
  @observable selectedCity = null;
  @observable selectedFishOrder = null;
  @observable selectedTripOrder = null;
  @observable userId = null;
  fishs = [];
  userData = [];
  @observable authKey = null;

  strings = new LocalizedStrings({
    
    en:{
      city:'City',
      fishs:'Fish',
      trips:'Trips',
      fishOffers:'Fish Offers',
      fishingDate:'Fishing date',
      riyal:'riyal',
      cookAavailable:'Cooking available',
      cookNotAavailable:'Cooking not available',
      deliveryAvailable:'Delivery available',
      deliveryNotAvailable:'Delivery not available',
      quantity:'Quantity',
      kg:'kg',
      buy:'Buy',
      speed_boat:'Speed Boat',
      boat:'Boat',
      jet:'Jet Skii',
      yacht:'Yacht',
      no_persons:'No. of persons',
      services:'Services',
      book:'Book',
      high_price:'Higher Price',
      lower_price:'Lower Price',
      home:'Home',
      fish_orders:'Fish Orders',
      trips_orders:'Trips Orders',
      profile:'Profile',
      contact:'Contact Us',
      terms:'Terms & Conditions',
      log_out:'Logout',
      vehicles:'Vehicles',
      my_ads:'My Ads',
      credit:'Credit',
      s_provider:'Service Provider',
      user:'User',
      mail:'E-Mail',
      password:'Password',
      login:'Login',
      register:'Register',
      register_profider:'Register Provider',
      name:'Name',
      phone:'Phone',
      continue:'Continue',
      marin:'Marin',
      boat_type:'Boat Type',
      upload_phott:'Upload Photo',
      boat_name:'Boat Name',
      register_no:'Registery Number',
      desc:'Description',
      weight:'Weight',
      cust_name:'Customer Name',
      price:'Price',
      cook:'Cook',
      deliver:'Delivery',
      deleted:'Deleted',
      accepted:'Accepted',
      pending:'Pending',
      accept:'Accept',
      decline:'Decline',
      completed:'Completed',
      period:'period',
      topic:'Topic',
      message:'Message',
      send:'send',
      delete:'Delete',
      sail_date:'Sailing Date',
      from:'From',
      to:'To',
      laaf:'Laaf',
      diving:'Diving',
      food:'Food',
      juice:'Juice',
      trip_type:'Trip Type',
      create:'Create',
      fish_type:'Fish Type',
      fish_date:'Fishing Date',
      available:'Available',
      not_available:'Not Available',
      choose_city:'Choose city first',
      fill_all:'Please fill all the fields',
      message_sent:'Message sent successfuly',
      wait:'Please Wait...',
      addAd:'Post Ad.',
      orders:'Orders',
      login_fail:'Failed, please check info and try again',
      pass_conf:'Passwords do not match',
      register_ok:'Registed Succefully, wait for acceptance',
      sortt:'Sort by',
      add_v:"Add Vehicle",
      passenger:'Passenger',
      ordered:'Already ordered',
      unavailable:'Not Available',
      no_of_tikets:'Number of tickets',
      hours:'Hours',
      err:'Error, Please try again later' ,
      ad_sent:"Ad sent successfuly, please wait for acceptance",
      pdf:'../../assets/terms-ar.pdf',
      v_added:'Vehicle added successfuly',
      phone2:'phone',
      c_name:'client name',
      duration:'duration'


    },
    ar: {
      city:'المدينة',
      fishs:'الأسماك',
      trips:'الرحلات',
      fishOffers:'عروض الأسماك',
      fishingDate:'تاريخ الصيد',
      riyal:'ريال',
      cookAavailable:'متاح القلي او الشوي',
      cookNotAavailable:'غير متاح القلي او الشوي',
      deliveryAvailable:'متاح التوصيل',
      deliveryNotAvailable:'غير متاح التوصيل',
      quantity:'الكمية',
      kg:'كجم',
      buy:'شراء',
      speed_boat:'سبيد بوت',
      boat:'قارب بحري',
      jet:'دباب بحري',
      yacht:'يخت بحري',
      no_persons:'عدد الأشخاص',
      services:'خدمات',
      book:'حجز',
      high_price:'أعلي سعر',
      lower_price:'أقل سعر',
      home:'الرئيسية',
      fish_orders:'طلبات الأسماك',
      trips_orders:'طلبات الرحلات',
      profile:'صفحتي الشخصية',
      contact:'اتصل بنا',
      terms:'الشروط والاحكام',
      log_out:'تسجيل الخروج',
      vehicles:'المركبات',
      my_ads:'اعلاناتي',
      credit:'الرصيد',
      s_provider:'مقدم خدمة',
      user:'عميل',
      mail:'البريد الاليكتروني',
      password:'كلمة السر',
      login:'تسجيل الدخول',
      register:'حساب جديد',
      register_profider:'تسجيل حوات',
      name:'الاسم',
      phone:'رقم الجوال',
      continue:'تابع',
      marin:'اسم المرسي',
      boat_type:'نوع المركبة',
      upload_phott:'صورة',
      boat_name:'اسم المركبة',
      register_no:'رقم التسجيل',
      desc:'نبذة عن الواسطة',
      weight:'الوزن',
      cust_name:'اسم العميل',
      price:'السعر',
      cook:'طهي',
      deliver:'توصيل',
      deleted:'محذوف',
      accepted:'مقبول',
      pending:'تحت الانتظار',
      accept:'قبول',
      decline:'رفض',
      completed:'مكتمل',
      period:'المدة',
      topic:'الموضوع',
      message:'الرسالة',
      send:'ارسال',
      delete:'حذف',
      sail_date:'تاريخ الابحار',
      from:'من الساعة',
      to:'الي الساعة',
      laaf:'لعف',
      diving:'عدة غوص',
      food:'طعام',
      juice:'عصيرات',
      trip_type:'نوع الرحلة',
      create:'إنشاء',
      fish_type:'نوع السمك',
      fish_date:'تاريخ الصيد',
      available:'متاح',
      not_available:'غير متاح',
      choose_city:'برجاء اختيار المدينة اولا',
      fill_all:'برجاء ملئ جميع البيانات',
      message_sent:'تم ارسال الرسالة بنجاح',
      wait:'برجاء الانتظار...',
      addAd:'إضافة إعلان',
      orders:'الطلبات',
      login_fail:'فشل تسجيل الدخول يرجي التأكد من البيانات',
      pass_conf:'كلمة السر غير متطابقة',
      register_ok:'تم التسجيل بنجاح يرجي انتظار قبول الحساب',
      sortt:'ترتيب حسب',
      add_v:'إضافة مركبة',
      passenger:'راكب',
      ordered:'مطلوب سابقا',
      unavailable:'غير متوفر',
      no_of_tikets:'عدد التذاكر المطلوبة',
      hours:'ساعات',
      err:"حدث خطأ يرجي المحاولة مره أخري",
      ad_sent:"تم اضافة الاعلان وفي انتظار الموافقه",
      pdf:'../../assets/terms-en.pdf',
      v_added:'تم اضافة المركبة بنجاح',
      phone2:'هاتف',
      c_name:'اسم العميل',
      duration:'المدة'
      
      
    }
   });

  @action setTrips(e) {
    this.trips = e;
  }

  @action setSlectedTrip(e) {
    
    this.selectedTrip = e;
  }

  @action setSlectedFish(e) {
    this.selectedFish = e;
  }

  @action setLogin(e) {
    this.loggedIn = e;
  }

  @action setCities(e) {
    this.cities = e;
  }

  @action setMarins(e) {
    this.marines = e;
  }

  @action setUserType(e) {
    this.userType = e;
  }

  @action setSelectedCity(e) {
    this.selectedCity = e;
  }

  @action setSelectedFishOrder(e) {
    this.selectedFishOrder = e;
  }

  @action setSelectedTripOrder(e) {
    this.selectedTripOrder = e;
  }

  @action setFishs(e) {
    
    this.fishs = e;
  }

  @action setUserId(e) {
    this.userId = e;
  }

  @action setUserKey(e) {
    this.authKey = e;
  }

  @action setUserData(e) {
    this.userData = e;
  }
}

const observableListStore = new ObservableListStore()
export default observableListStore