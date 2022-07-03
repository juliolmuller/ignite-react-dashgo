import { Box, Flex } from '@chakra-ui/react';

import { PageButton } from './PageButton';

interface PageButtonProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onClick: (page: number) => void;
}

export function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  onClick,
}: PageButtonProps) {
  const fromItem = (currentPage - 1) * itemsPerPage + 1;
  const toItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Flex
      direction={['column', 'row']}
      justify="space-between"
      align="center"
      gap="6"
      mt="8"
    >
      <Box whiteSpace="nowrap">
        <strong>{fromItem}</strong> - <strong>{toItem}</strong> de {totalItems}
      </Box>

      <Flex gap="2" wrap="wrap">
        {Array(totalPages)
          .fill(null)
          .map((_, index: number) => (
            <PageButton
              key={index}
              active={index + 1 === currentPage}
              onClick={() => onClick(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
      </Flex>
    </Flex>
  );
}
