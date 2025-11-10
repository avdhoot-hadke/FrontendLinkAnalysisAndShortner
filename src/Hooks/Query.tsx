import { useQuery } from "@tanstack/react-query";
import api from "../Api/Api";

type ErrorHandler = (error: unknown) => void;

interface ShortUrl {
    id: string;
    originalLink: string;
    shortUrl: string;
    createdDate: string;
    clicks: number;
}

interface ClickStats {
    [date: string]: number;
}

interface ClickEntry {
    clickDate: string;
    count: number;
}

//Fetch user's short URLs
export const useFetchMyShortUrls = (token: string, onError?: ErrorHandler) => {
    return useQuery<ShortUrl[], Error>({
        queryKey: ["my-shortenurls"],
        queryFn: async () => {
            try {
                const res = await api.get<ShortUrl[]>("/api/links/my-links", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                return res.data;
            } catch (error) {
                onError?.(error);
                throw error;
            }
        },
        select: (data) =>
            data.sort(
                (a, b) =>
                    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            ),
        staleTime: 5000,
    });
};

//Fetch total click stats
export const useFetchTotalClicks = (token: string, onError?: ErrorHandler) => {
    return useQuery<ClickStats, Error, ClickEntry[]>({
        queryKey: ["url-totalclick"],
        queryFn: async (): Promise<ClickStats> => {
            try {
                const res = await api.get<ClickStats>(
                    "/api/links/total-clicks?startDate=2025-10-01&endDate=2025-12-07",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return res.data;
            } catch (error) {
                onError?.(error);
                throw error;
            }
        },
        select: (data) =>
            Object.entries(data).map(([date, count]) => ({
                clickDate: date,
                count,
            })),
        staleTime: 5000,
    });
};
