import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isMenuOpen,
    rootRef: sidebarRef,
    onChange: setIsMenuOpen,
  });

  const toggleMenu = (): void => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleOptionChange =
    (optionName: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prevFormState) => ({ ...prevFormState, [optionName]: option }));
    };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
  };

  const handleFormReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <div ref={sidebarRef}>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleOptionChange('fontFamilyOption')}
          />
          <RadioGroup
            name="radio"
            title="Размер шрифта"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={handleOptionChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleOptionChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleOptionChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleOptionChange('contentWidth')}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
