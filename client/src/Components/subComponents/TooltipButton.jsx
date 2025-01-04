/* eslint-disable react/prop-types */
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const ToolTipButton = ({ children, ToolTipcontent }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{ToolTipcontent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
export default ToolTipButton