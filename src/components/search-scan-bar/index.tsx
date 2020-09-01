import React, { useState, useRef } from 'react';
import ScanIcon from '@assets/images/scan_grey.png';
import SearchIcon from '@assets/images/search.png';
import DelIcon from '@assets/images/del.png';
import './index.less';

export const SearchScanBar = (props: SearchScanBarProps) => {

  const { 
    placeholder, 
    onChange = () => {}, 
    maxLength,
    onScanClick = () => {}
  } = props;

  const [showDel, setShowDel ] = useState<boolean>(false)

  const [value, setValue] = useState<string>('')

  const onChangeFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
    setValue(value)
    if(value && !showDel) {
      setShowDel(true)
    }
  }

  const clearInput = () => {
    setValue('')
    setShowDel(false)
    onChange('')
  }

  return (
    <div className="search-scan-bar center">
      <div className="bar-container">
        <img className="icon" src={SearchIcon}/>
        <input 
          type="search" 
          value={value}
          className="bar-input"
          onChange={onChangeFun}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {
          showDel ? <img onClick={()=> clearInput()} className="del-icon" src={DelIcon}/> : null
        }
        <img onClick={()=> onScanClick()} className="icon" src={ScanIcon}/>
      </div>
    </div>
  )
}

export type SearchScanBarProps = {
  placeholder?: string;
  onChange?: Function;
  maxLength?: number;
  onScanClick?: Function;
}