import React from 'react'
import { Label, Spacing, TextField, Tabs, sizes, Text, SelectList } from 'react-elemental'

const BuySellComponent = ({
    selectedTag,
    onChange,
    onSubmit,
    amount
}) => (
    <div>
        <Spacing top bottom left right>
            <Spacing top>
                <Label label='Amount'/>
            </Spacing>
            <Spacing bottom>
                <TextField
                    name='amount'
                    type='tel'
                    value={ amount }
                    onChange={ onChange }
                />
            </Spacing>
        </Spacing>

        <Spacing top bottom left right>
            <Spacing top>
                <Label label='Price WETH'/>
            </Spacing>
            <Spacing bottom>
                <TextField
                    name='price-weth'
                    type='tel'
                    value={ amount }
                    onChange={ onChange }
                />
            </Spacing>
        </Spacing>

        <Spacing top bottom left right>
            <Spacing top>
                <Label label='Expires'/>
            </Spacing>
            <Spacing bottom style={{ 'display': 'flex', 'flex-direction': 'row', 'justify-content': 'center', 'align-items': 'center' }}>
                <Spacing right style={{ 'display': 'flex', 'flex': '1 1 70px' }}>
                    <TextField
                        name='duration'
                        type='tel'
                        value={ amount }
                        onChange={ onChange }
                    />
                </Spacing>
                <Spacing style={{ 'display': 'flex', 'flex': '1 1 calc(100% - 70px)' }}>
                    <SelectList
                        name='duration-period'
                        options={[
                            { value: 'minutes', label: 'minutes' },
                            { value: 'hours', label: 'hours' },
                            { value: 'days', label: 'days' },
                            { value: 'months', label: 'months' },
                        ]}
                        onChange={ onChange }
                    />
                </Spacing>
            </Spacing>
        </Spacing>
        
    </div>
)

export default BuySellComponent