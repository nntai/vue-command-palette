import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faPerson,
  faMagnifyingGlass,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowUp, faArrowDown, faPerson, faMagnifyingGlass, faArrowTurnDown);

export default FontAwesomeIcon;
