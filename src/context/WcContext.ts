import {WebContainer} from "@webcontainer/api";
import { createContext } from "react";

export const WcContext = createContext<WebContainer | null>(null);
