import styled from 'styled-components';
import {
    RiCloseCircleFill,
    RiAddCircleLine,
    RiIndeterminateCircleLine,
} from 'react-icons/ri';
import theme from 'assets/style/theme';
import { useMemo } from 'react';
import RadioButton from 'components/common/RadioButton';
import FlexBox from 'components/common/FlexBox';
import IOrder from 'types/Order';
import useOrderContext from 'utils/hooks/useOrderContext';

const Block = styled.div`
    width: 100%;
    height: 170px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 16px;
`;

const LeftArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 100px;
    }
    p {
        font-size: 14px;
        font-weight: 700;
        color: ${theme.colors.black};
    }
    span {
        font-size: 12px;
        color: ${theme.colors.gray};
    }
`;

const RightArea = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}`;

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:first-child {
        width: 45px;
        font-size: 14px;
        font-weight: 700;
    }
    .green {
        color: ${theme.colors.green};
        .price {
            display: inline-block;
            text-align: right;
        }
    }
`;

const QuantityCounter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    button {
        width: 20px;
        height: 20px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        &:hover {
            color: ${theme.colors.green};
        }
        &:disabled {
            cursor: default;
            &:hover {
                color: rgba(16, 16, 16, 0.3);
                opacity: 1;
            }
        }
    }
`;

const CancelButton = styled.button`
    width: 24px;
    height: 24px;
    font-size: 24px;
    border: none;
    color: ${theme.colors.red};
    position: absolute;
    right: 8px;
    top: 12px;
    background-color: transparent;
`;

type OrderItemProps = {
    item: IOrder;
};

function OrderItem({ item }: OrderItemProps) {
    const context = useOrderContext();
    const { menu } = item;

    const price = useMemo(() => {
        const comboPrice =
            menu.comboPrice === undefined ? menu.price : menu.comboPrice;
        const menuPrice = item.combo ? comboPrice : menu.price;

        return item.quantity * menuPrice;
    }, [item.quantity, item.combo]);

    const changeComboType = (type: string) => {
        const isCombo = type === 'single' ? false : true;
        context.changeOrder({ ...item, combo: isCombo });
    };

    const changeQuantity = (count: number) => {
        context.changeOrder({ ...item, quantity: item.quantity + count });
    };

    const removeMenu = () => {
        if (item.id !== undefined) {
            context.cancelOrder(item.id);
        }
    };

    return (
        <Block>
            <LeftArea>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/${menu.type}/${menu.img}`}
                />
                <p>{menu.name}</p>
                <span>{menu.nameEn}</span>
            </LeftArea>
            <RightArea>
                <Box>
                    <div>가격</div>
                    <div className="green">
                        <div className="price">{price.toLocaleString()}</div> 원
                    </div>
                </Box>
                <Box>
                    <div>수량</div>
                    <QuantityCounter>
                        <button
                            onClick={() => changeQuantity(-1)}
                            disabled={item.quantity > 1 ? false : true}
                        >
                            <RiIndeterminateCircleLine />
                        </button>

                        {item.quantity}
                        <button
                            onClick={() => changeQuantity(1)}
                            disabled={item.quantity < 10 ? false : true}
                        >
                            <RiAddCircleLine />
                        </button>
                    </QuantityCounter>
                </Box>
                {menu.type === 'burger' && (
                    <FlexBox justifyContent="space-between">
                        <RadioButton
                            label="단품"
                            name={`menuType${item.id}`}
                            id="single"
                            value="false"
                            onChange={() => changeComboType('single')}
                            isChecked={true}
                        />
                        <RadioButton
                            label="세트"
                            name={`menuType${item.id}`}
                            id="combo"
                            value="true"
                            onChange={() => changeComboType('combo')}
                            isChecked={false}
                        />
                    </FlexBox>
                )}
            </RightArea>
            <CancelButton onClick={removeMenu}>
                <RiCloseCircleFill />
            </CancelButton>
        </Block>
    );
}

export default OrderItem;
