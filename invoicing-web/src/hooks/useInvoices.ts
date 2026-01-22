import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceApi } from '../services/api';
import type { CreateInvoiceDTO } from '../types/invoice';

// Query key factory
export const invoiceKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceKeys.all, 'list'] as const,
  list: (filters: string) => [...invoiceKeys.lists(), { filters }] as const,
  details: () => [...invoiceKeys.all, 'detail'] as const,
  detail: (id: number) => [...invoiceKeys.details(), id] as const,
};

// Hook to fetch all invoices with rapid polling
export const useInvoices = () => {
  return useQuery({
    queryKey: invoiceKeys.lists(),
    queryFn: invoiceApi.getAll,
    refetchInterval: 500, // Poll every 500ms for rapid updates (demo project)
    staleTime: 0, // Always consider data stale for immediate updates
  });
};

// Hook to fetch a single invoice
export const useInvoice = (id: number) => {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => invoiceApi.getById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

// Hook to create a new invoice
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateInvoiceDTO) => invoiceApi.create(dto),
    onSuccess: () => {
      // Invalidate and refetch invoices list after creating
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
    },
  });
};
