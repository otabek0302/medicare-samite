/* eslint-disable react/prop-types */
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/Components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { Box, Button, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// @ts-ignore
export default function UsersCombobox({ data: items, setState, name, defaultData, addNew, addOpen }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const { colorMode } = useColorMode();
  const [selected, setselected] = useState();

  useEffect(() => {
    if (defaultData) {
      // @ts-ignore
      const selectedItem = items?.find((item) => {
        if (typeof defaultData === 'string') {
          return item.id === Number(defaultData);
        } else if (typeof defaultData === 'object' && defaultData !== null) {
          return (
            item.f_name === defaultData.f_name &&
            item.l_name === defaultData.l_name &&
            item.phone === defaultData.phone
          );
        }
        return false;
      });
      if (selectedItem) {
        setValue(selectedItem);
        setState(selectedItem);
        setselected(selectedItem);
      }
    }
  }, [defaultData, items, setState]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          fontWeight={'500'}
          justifyContent={'space-between'}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[100%] h-8 justify-between bg-transparent hover:bg-transparent hover:text-inherit rounded-[6px] capitalize text-sm ${
            colorMode === 'dark' ? 'border-[#ffffff3d]' : 'border-[#E2e8f0]'
          }}`}>
          {/* @ts-ignore */}
          {value ? `${value.f_name} ${value.l_name}` : `Select ${name}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 " />
        </Button>
      </PopoverTrigger>
      {/* @ts-ignore */}
      <PopoverContent className={`w-[300px] p-0 max-h-[240px] overflow-y-scroll hideScrollbar z-[1500] ${ colorMode === 'dark' ? 'bg-[#2D3748]' : 'bg-[#ffffff]' }`}>
        {/* @ts-ignore */}
        <Command className={`${ colorMode === 'dark' ? 'bg-[#2D3748]' : 'bg-[#ffffff]' }`}>
          {/* @ts-ignore */}
          <CommandInput placeholder={`Search ${name}`} className={colorMode === 'dark' ? 'text-[#fff]' : 'text-[#000]'} />
          {/* @ts-ignore */}
          <CommandEmpty>
            <Text>No {name} found.</Text>
            {addNew && (
              <Box
                w={'100%'}
                px={4}
                mt={2}>
                <Button
                  size={'sm'}
                  w={'100%'}
                  colorScheme={'blue'}
                  onClick={() => {
                    setOpen(false);
                    addOpen();
                  }}>
                  Add {name}
                </Button>
              </Box>
            )}
          </CommandEmpty>
          {/* @ts-ignore */}
          <CommandGroup>
            {/* @ts-ignore */}
            {items?.map((item) => (
              // @ts-ignore
          <CommandItem
                key={item.id}
                value={`${item.f_name.toString()} ${item.l_name.toString()} ${
                  item.phone
                }`}
                onSelect={() => {
                  setOpen(false);
                  setValue(item);
                  setselected(item);
                  setState(item);
                }}
                className="dark:text-white capitalize">
                {/* @ts-ignore */}
                <Check className={`mr-2 h-4 w-4 ${ item.id === selected?.id ? 'opacity-100' : 'opacity-0' }`} />
                {item.f_name} {item.l_name} {item.phone}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
