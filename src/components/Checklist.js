import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  fontSize,
  fontWeights,
  minBreakpointQuery,
  sectionMargins,
  visuallyHidden,
} from '../styles';
import { Container, HtmlContent } from './ui';
import { slugify } from '../utils';

const StyledChecklist = styled.section`
  ${sectionMargins()};
`;

const StyledItem = styled.div`
  margin: 20px 0;
  padding: 20px 30px;

  ${minBreakpointQuery.small`
    padding: 25px 40px;
  `}

  ${minBreakpointQuery.large`
    padding: 30px 50px;
  `}
`;

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckboxLabel = styled.label``;

const StyledCheckbox = styled.input`
  margin: 0;
  height: 14px;
  width: 14px;
  flex-shrink: 0;
`;

const StyledCheckboxCategoryText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(20)};
  font-weight: ${fontWeights.bold};
`;

const StyledCheckboxLabelText = styled.span`
  ${visuallyHidden()};
`;

const StyledCheckboxSubcategoryText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(18)};
  font-weight: ${fontWeights.bold};
`;

const StyledCheckboxItemText = styled.span`
  position: relative;
  display: block;
  padding-left: 14px;
  ${fontSize(16)};
  font-weight: ${fontWeights.bold};
`;

const StyledContentWrapper = styled.div`
  ${({ $display }) => {
    if (!$display) {
      return css`
        ${visuallyHidden()};
      `;
    }
  }}
`;

const StyledContent = styled(HtmlContent)``;

const Checklist = ({ checkboxOptions }) => {
  const [parentChecked, setParentChecked] = useState(
    new Array(checkboxOptions.length).fill(false),
  );
  const [childChecked, setChildChecked] = useState(
    checkboxOptions.map(parent =>
      new Array(parent.treeChildren.length).fill(false),
    ),
  );
  const [subChildChecked, setSubChildChecked] = useState(
    checkboxOptions.map(parent =>
      parent.treeChildren.map(child =>
        child.treeChildren && child.treeChildren.length > 0
          ? new Array(child.treeChildren.length).fill(false)
          : [],
      ),
    ),
  );

  const handleParentCheckboxChange = parentIndex => {
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = !updatedParentChecked[parentIndex];
    setParentChecked(updatedParentChecked);

    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex] = updatedParentChecked[parentIndex]
      ? new Array(checkboxOptions[parentIndex].treeChildren.length).fill(true)
      : new Array(checkboxOptions[parentIndex].treeChildren.length).fill(false);
    setChildChecked(updatedChildChecked);

    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex] = updatedParentChecked[parentIndex]
      ? checkboxOptions[parentIndex].treeChildren.map(child =>
          child.treeChildren && child.treeChildren.length > 0
            ? new Array(child.treeChildren.length).fill(true)
            : [],
        )
      : checkboxOptions[parentIndex].treeChildren.map(child =>
          child.treeChildren && child.treeChildren.length > 0
            ? new Array(child.treeChildren.length).fill(false)
            : [],
        );
    setSubChildChecked(updatedSubChildChecked);
  };

  const handleChildCheckboxChange = (parentIndex, childIndex) => {
    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex][childIndex] =
      !updatedChildChecked[parentIndex][childIndex];
    setChildChecked(updatedChildChecked);

    const allChildChecked = updatedChildChecked[parentIndex].every(
      isChecked => isChecked,
    );
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = allChildChecked;
    setParentChecked(updatedParentChecked);

    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex][childIndex] =
      updatedChildChecked[parentIndex][childIndex];
    setSubChildChecked(updatedSubChildChecked);

    if (updatedChildChecked[parentIndex][childIndex]) {
      const updatedSubChildChecked = [...subChildChecked];
      updatedSubChildChecked[parentIndex][childIndex] =
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren &&
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren
          .length > 0
          ? checkboxOptions[parentIndex].treeChildren[
              childIndex
            ].treeChildren.map(() => true)
          : [];
      setSubChildChecked(updatedSubChildChecked);
    } else {
      const updatedSubChildChecked = [...subChildChecked];
      updatedSubChildChecked[parentIndex][childIndex] =
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren &&
        checkboxOptions[parentIndex].treeChildren[childIndex].treeChildren
          .length > 0
          ? checkboxOptions[parentIndex].treeChildren[
              childIndex
            ].treeChildren.map(() => false)
          : [];
      setSubChildChecked(updatedSubChildChecked);
    }
  };

  const handleSubChildCheckboxChange = (
    parentIndex,
    childIndex,
    subChildIndex,
  ) => {
    const updatedSubChildChecked = [...subChildChecked];
    updatedSubChildChecked[parentIndex][childIndex][subChildIndex] =
      !updatedSubChildChecked[parentIndex][childIndex][subChildIndex];
    setSubChildChecked(updatedSubChildChecked);

    const allSubChildChecked = updatedSubChildChecked[parentIndex][
      childIndex
    ].every(isChecked => isChecked);
    const updatedChildChecked = [...childChecked];
    updatedChildChecked[parentIndex][childIndex] = allSubChildChecked;
    setChildChecked(updatedChildChecked);

    const allChildChecked = updatedChildChecked[parentIndex].every(
      isChecked => isChecked,
    );
    const updatedParentChecked = [...parentChecked];
    updatedParentChecked[parentIndex] = allChildChecked;
    setParentChecked(updatedParentChecked);
  };

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <StyledChecklist>
      <Container>
        {checkboxOptions.map((parent, parentIndex) => {
          const display = activeCategory === parentIndex;
          return (
            <StyledItem key={parentIndex}>
              <StyledCheckboxWrapper>
                <StyledCheckboxLabel>
                  <StyledCheckbox
                    name={slugify(parent.title)}
                    type="checkbox"
                    checked={parentChecked[parentIndex]}
                    onChange={() => handleParentCheckboxChange(parentIndex)}
                  />
                  <StyledCheckboxLabelText>
                    {parent.title}
                  </StyledCheckboxLabelText>
                </StyledCheckboxLabel>
                <StyledCheckboxCategoryText
                  onClick={() =>
                    setActiveCategory(display ? undefined : parentIndex)
                  }
                >
                  {parent.title}
                </StyledCheckboxCategoryText>
              </StyledCheckboxWrapper>
              <StyledContentWrapper $display={display}>
                <StyledContent content={parent.content} />
                {parent.treeChildren.map((child, childIndex) => {
                  const display = activeSubcategory === childIndex;
                  return (
                    <StyledItem key={childIndex}>
                      <StyledCheckboxWrapper>
                        <StyledCheckboxLabel>
                          <StyledCheckbox
                            name={slugify(child.title)}
                            type="checkbox"
                            checked={childChecked[parentIndex][childIndex]}
                            onChange={() =>
                              handleChildCheckboxChange(parentIndex, childIndex)
                            }
                          />
                        </StyledCheckboxLabel>
                        <StyledCheckboxSubcategoryText
                          onClick={() =>
                            setActiveSubcategory(
                              display ? undefined : childIndex,
                            )
                          }
                        >
                          {child.title}
                        </StyledCheckboxSubcategoryText>
                      </StyledCheckboxWrapper>
                      <StyledContentWrapper $display={display}>
                        <HtmlContent content={child.content} />
                        {child.treeChildren &&
                          child.treeChildren.length > 0 &&
                          child.treeChildren.map((subChild, subChildIndex) => {
                            const display = activeItem === subChildIndex;
                            return (
                              <StyledItem key={subChildIndex}>
                                <StyledCheckboxWrapper>
                                  <StyledCheckboxLabel>
                                    <StyledCheckbox
                                      type="checkbox"
                                      checked={
                                        subChildChecked[parentIndex][
                                          childIndex
                                        ][subChildIndex]
                                      }
                                      onChange={() =>
                                        handleSubChildCheckboxChange(
                                          parentIndex,
                                          childIndex,
                                          subChildIndex,
                                        )
                                      }
                                    />
                                  </StyledCheckboxLabel>
                                  <StyledCheckboxItemText
                                    onClick={() =>
                                      setActiveItem(
                                        display ? undefined : subChildIndex,
                                      )
                                    }
                                  >
                                    {subChild.title} ({subChild.level})
                                  </StyledCheckboxItemText>
                                </StyledCheckboxWrapper>
                                <StyledContentWrapper $display={display}>
                                  <HtmlContent content={subChild.content} />
                                </StyledContentWrapper>
                              </StyledItem>
                            );
                          })}
                      </StyledContentWrapper>
                    </StyledItem>
                  );
                })}
              </StyledContentWrapper>
            </StyledItem>
          );
        })}
      </Container>
    </StyledChecklist>
  );
};

export default Checklist;
