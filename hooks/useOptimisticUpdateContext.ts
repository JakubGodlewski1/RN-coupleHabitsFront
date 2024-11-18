import {useContext} from "react";
import {OptimisticUpdateContext} from "@/contexts/OptimisticUpdateContext";

export const useOptimisticUpdateContext = () => useContext(OptimisticUpdateContext)